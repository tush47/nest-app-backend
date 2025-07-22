import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddRemoveMemberDto } from './dto/add-remove-member.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }

  @Post(':id/members')
  addMember(
    @Param('id', ParseIntPipe) groupId: number,
    @Body(new ValidationPipe({ transform: true })) body: AddRemoveMemberDto,
  ) {
    return this.groupsService.addMember(groupId, body.userId);
  }

  @Delete(':id/members/:userId')
  removeMember(
    @Param('id', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.groupsService.removeMember(groupId, userId);
  }
}
