import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SettlementsModule } from './settlements/settlements.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),GroupsModule, UsersModule, ExpensesModule, SettlementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
