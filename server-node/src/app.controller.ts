import { Controller, Get } from '@nestjs/common';
import { AppService, VersionInformation } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getVersion(): VersionInformation {
    return this.appService.getVersion();
  }
}
