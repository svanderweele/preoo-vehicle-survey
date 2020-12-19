import { Injectable } from '@nestjs/common';

export interface VersionInformation{
  version: string;
  name:string;
}

@Injectable()
export class AppService {
  getVersion(): VersionInformation {
    return {
      name:"Preoo Survey API - NextJS",
      version:"1.0.0",
    }
  }
}
