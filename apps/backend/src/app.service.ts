import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverStats() {
    return {
      message: 'Server is running smoothly',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
