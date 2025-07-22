import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { SplitExpenseDto } from './dto/split-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }

  @Post(':id/split')
  splitExpense(
    @Param('id', ParseIntPipe) expenseId: number,
    @Body(new ValidationPipe({ transform: true })) splitDto: SplitExpenseDto,
  ) {
    return this.expensesService.splitExpense(expenseId, splitDto);
  }
} 