import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [InvoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
