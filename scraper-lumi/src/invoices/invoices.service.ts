import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) {
    }

    async findById(id: string) {
        return await this.prisma.invoice.findFirst({
            where: {
                id,
            }
        });
    }

    async findByClientId(clientNumber: string) {
        return await this.prisma.invoice.findMany({
            include: {
                energyEletric: true,
                energyGdi: true,
                energySceeIcms: true,
            },
            where: {
                clientNumber: clientNumber
            }
        })
    }

    async find() {
        return await this.prisma.invoice.findMany({
            include: {
                energyEletric: true,
                energyGdi: true,
                energySceeIcms: true,
            },

        })
    }
}
