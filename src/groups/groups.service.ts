import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { query } from '../db';
import { Group } from './groups.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  async findAll(): Promise<Group[]> {
    const result = await query('SELECT * FROM groups ORDER BY id');
    return result.rows;
  }

  async findOne(id: number): Promise<Group> {
    const result = await query('SELECT * FROM groups WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundException('Group not found');
    return result.rows[0];
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const result = await query(
        'INSERT INTO groups (name, created_at) VALUES ($1, NOW()) RETURNING *',
        [createGroupDto.name],
      );
      return result.rows[0];
    } catch (err) {
      throw new InternalServerErrorException('Could not create group');
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    const name = updateGroupDto.name ?? group.name;
    const result = await query(
      'UPDATE groups SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    const result = await query('DELETE FROM groups WHERE id = $1', [id]);
    if (result.rowCount === 0) throw new NotFoundException('Group not found');
  }

  async addMember(groupId: number, userId: number): Promise<void> {
    try {
      await query('INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)', [groupId, userId]);
    } catch (err) {
      throw new InternalServerErrorException('Could not add member');
    }
  }

  async removeMember(groupId: number, userId: number): Promise<void> {
    const result = await query('DELETE FROM group_members WHERE group_id = $1 AND user_id = $2', [groupId, userId]);
    if (result.rowCount === 0) throw new NotFoundException('Member not found in group');
  }
}
