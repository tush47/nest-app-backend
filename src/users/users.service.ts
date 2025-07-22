import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { query } from '../db';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    const result = await query('SELECT * FROM users ORDER BY id');
    return result.rows;
  }

  async findOne(id: number): Promise<User> {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundException('User not found');
    return result.rows[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const result = await query(
        'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [createUserDto.name, createUserDto.email],
      );
      return result.rows[0];
    } catch (err) {
      throw new InternalServerErrorException('Could not create user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const name = updateUserDto.name ?? user.name;
    const email = updateUserDto.email ?? user.email;
    const result = await query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) throw new NotFoundException('User not found');
  }
} 