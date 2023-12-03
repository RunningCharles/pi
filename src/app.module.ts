import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ENV, Utils } from 'src/common/utils';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { IPReportModule } from 'src/ipreport/ipreport.module';
import { ClockModule } from 'src/clock/clock.module';
import { TestModule } from 'src/1test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${Utils.env()}`, `.env.${ENV.dev}`]
    }),
    ScheduleModule.forRoot(),
    IPReportModule.register(),
    ClockModule.register(),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
