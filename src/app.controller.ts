import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// controllers are to check if everything we pass in the payload are correct or not
// if everything is passed correctly, the flow is passed to the service
// otherwise the controller gives us error