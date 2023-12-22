-- CreateTable
CREATE TABLE "EnergyEletric" (
    "id" TEXT NOT NULL,
    "kwh" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "EnergyEletric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyGdi" (
    "id" TEXT NOT NULL,
    "kwh" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "EnergyGdi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergySceeIcms" (
    "id" TEXT NOT NULL,
    "kwh" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "EnergySceeIcms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "filename" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "referenceDate" TEXT NOT NULL,
    "scrapeDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnergyEletric_invoiceId_key" ON "EnergyEletric"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyGdi_invoiceId_key" ON "EnergyGdi"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "EnergySceeIcms_invoiceId_key" ON "EnergySceeIcms"("invoiceId");

-- AddForeignKey
ALTER TABLE "EnergyEletric" ADD CONSTRAINT "EnergyEletric_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyGdi" ADD CONSTRAINT "EnergyGdi_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergySceeIcms" ADD CONSTRAINT "EnergySceeIcms_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
