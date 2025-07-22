import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { query } from '../db';
import { Expense } from './expenses.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { SplitExpenseDto } from './dto/split-expense.dto';

@Injectable()
export class ExpensesService {
  async findAll(): Promise<Expense[]> {
    const result = await query('SELECT * FROM expenses ORDER BY id');
    return result.rows;
  }

  async findOne(id: number): Promise<Expense> {
    const result = await query('SELECT * FROM expenses WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundException('Expense not found');
    return result.rows[0];
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const result = await query(
        'INSERT INTO expenses (group_id, description, amount, paid_by, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [createExpenseDto.group_id, createExpenseDto.description, createExpenseDto.amount, createExpenseDto.paid_by],
      );
      return result.rows[0];
    } catch (err) {
      throw new InternalServerErrorException('Could not create expense');
    }
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.findOne(id);
    const group_id = updateExpenseDto.group_id ?? expense.group_id;
    const description = updateExpenseDto.description ?? expense.description;
    const amount = updateExpenseDto.amount ?? expense.amount;
    const paid_by = updateExpenseDto.paid_by ?? expense.paid_by;
    const result = await query(
      'UPDATE expenses SET group_id = $1, description = $2, amount = $3, paid_by = $4 WHERE id = $5 RETURNING *',
      [group_id, description, amount, paid_by, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    const result = await query('DELETE FROM expenses WHERE id = $1', [id]);
    if (result.rowCount === 0) throw new NotFoundException('Expense not found');
  }

  async splitExpense(expenseId: number, splitDto: SplitExpenseDto): Promise<void> {
    // Assume shares are in the same order as userIds
    for (let i = 0; i < splitDto.userIds.length; i++) {
      await query(
        'INSERT INTO expense_splits (expense_id, user_id, share) VALUES ($1, $2, $3)',
        [expenseId, splitDto.userIds[i], splitDto.shares[i]],
      );
    }
  }
} 