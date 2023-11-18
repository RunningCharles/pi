import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TestModule } from 'src/1test/test.module';
import { ENV, Utils } from 'src/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${Utils.env()}`, `.env.${ENV.dev}`]
  }),
  TestModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
