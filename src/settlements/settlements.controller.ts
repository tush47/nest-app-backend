import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { SettlementsService } from './settlements.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Controller('settlements')
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Get()
  findAll() {
    return this.settlementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.settlementsService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createSettlementDto: CreateSettlementDto) {
    return this.settlementsService.create(createSettlementDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateSettlementDto: UpdateSettlementDto,
  ) {
    return this.settlementsService.update(id, updateSettlementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.settlementsService.remove(id);
  }
} 