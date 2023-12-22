import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('invoices')
export class InvoicesController {

    constructor(private service: InvoicesService) {}

    @Get()
    public async findAll(@Query('clientNumber') clientNumber: string) {
        if (clientNumber) {
            return await this.service.findByClientId(clientNumber);
        }
        return await this.service.find()
    }


    @Get(":id/export")
    public  async downloadInvoicce(@Param('id') invoiceId: string, @Res() res: Response) {
        const invoice = await this.service.findById(invoiceId)

        const file = createReadStream(join(process.cwd(), '..', 'Faturas', invoice.filename));
        file.pipe(res);
    }
}
