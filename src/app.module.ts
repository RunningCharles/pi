import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { IPReportModule } from 'src/ipreport/ipreport.module';
import { TestModule } from 'src/1test/test.module';
import { ENV, Utils } from 'src/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${Utils.env()}`, `.env.${ENV.dev}`]
    }),
    ScheduleModule.forRoot(),
    IPReportModule.register(),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
