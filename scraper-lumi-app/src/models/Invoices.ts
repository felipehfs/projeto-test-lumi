export interface Invoice {
    id: string
    clientNumber: string
    dueDate: string
    filename: string
    price: number
    referenceDate: string
    scrapeDate: string
    cityContribution: number
    energyEletric: EnergyEletric
    energyGdi: EnergyGdi
    energySceeIcms: EnergySceeIcms
  }
  
  export interface EnergyEletric {
    id: string
    kwh: number
    price: number
    invoiceId: string
  }
  
  export interface EnergyGdi {
    id: string
    kwh: number
    price: number
    invoiceId: string
  }
  
  export interface EnergySceeIcms {
    id: string
    kwh: number
    price: number
    invoiceId: string
  }
  
