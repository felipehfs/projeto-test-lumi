import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import data from './data.json'

function parseDueDate(date: string) {
    let parts = date.split('/')
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`).toISOString()
}

async function main() {
    for (let item of data) {
        let  dueDate = parseDueDate(item.due_date)

        await prisma.invoice.create({
            data: {
                cityContribution: item.city_contribution,
                clientNumber: item.client_number,
                dueDate: dueDate,
                energyEletric: {
                    create: {
                        kwh: item.energy_eletric.kwh,
                        price: item.energy_eletric.price
                    }
                },
                energyGdi: {
                    create: {
                        kwh: item.energy_gdi.kwh,
                        price: item.energy_gdi.price,
                    }
                },
                energySceeIcms: {
                    create: {
                        kwh: item.energy_scee_icms.kwh,
                        price: item.energy_scee_icms.price,
                    }
                },
                price: item.price,
                scrapeDate: new Date(item.scrape_date).toISOString(),
                filename: item.filename,
                referenceDate: item.reference_date
            }
        })
    }
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
