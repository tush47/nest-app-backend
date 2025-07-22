import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { query } from '../db';
import { Settlement } from './settlements.entity';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Injectable()
export class SettlementsService {
  async findAll(): Promise<Settlement[]> {
    const result = await query('SELECT * FROM settlements ORDER BY id');
    return result.rows;
  }

  async findOne(id: number): Promise<Settlement> {
    const result = await query('SELECT * FROM settlements WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundException('Settlement not found');
    return result.rows[0];
  }

  async create(createSettlementDto: CreateSettlementDto): Promise<Settlement> {
    try {
      const result = await query(
        'INSERT INTO settlements (group_id, paid_by, paid_to, amount, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [createSettlementDto.group_id, createSettlementDto.paid_by, createSettlementDto.paid_to, createSettlementDto.amount],
      );
      return result.rows[0];
    } catch (err) {
      throw new InternalServerErrorException('Could not create settlement');
    }
  }

  async update(id: number, updateSettlementDto: UpdateSettlementDto): Promise<Settlement> {
    const settlement = await this.findOne(id);
    const group_id = updateSettlementDto.group_id ?? settlement.group_id;
    const paid_by = updateSettlementDto.paid_by ?? settlement.paid_by;
    const paid_to = updateSettlementDto.paid_to ?? settlement.paid_to;
    const amount = updateSettlementDto.amount ?? settlement.amount;
    const result = await query(
      'UPDATE settlements SET group_id = $1, paid_by = $2, paid_to = $3, amount = $4 WHERE id = $5 RETURNING *',
      [group_id, paid_by, paid_to, amount, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    const result = await query('DELETE FROM settlements WHERE id = $1', [id]);
    if (result.rowCount === 0) throw new NotFoundException('Settlement not found');
  }
} 