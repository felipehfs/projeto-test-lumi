import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Container, Header, Section, Card } from "./Invoices.styles";
import { Invoice } from "../../models/Invoices";
import { useEffect, useState } from "react";
import InvoiceTable from "../../components/InvoiceTable/Table";
import { TableDataItem } from "../../components/InvoiceTable/Table.styles";
import { api } from "../../services/api";
import { FaFilePdf } from "react-icons/fa";
import EmptyState from "../../components/EmptyState/EmptyState";

const headers = ["Número do cliente", "Mês referente", "Ações"];
function Invoices() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get(`invoices?clientNumber=${params.id}`);
      setInvoices(response.data);
    }

    if (params.id?.trim()) {
      fetchApi();
    }
  }, [params.id]);

  const handleBack = () => {
    navigate(`/${params.id}`);
  };

  const handleDownload = async (invoiceId: string) => {
    window.open(`http://localhost:3000/invoices/${invoiceId}/export`);
  };

  return (
    <Container>
      <Header>
        <h1>Controle de gastos</h1>
        <Button type="submit" onClick={handleBack}>
          Voltar
        </Button>
      </Header>
      {invoices.length === 0 ? (
        <EmptyState />
      ) : (
        <Section>
          <h1>Faturas</h1>
          <Card>
            <InvoiceTable
              headers={headers}
              data={invoices}
              renderItem={(invoice) => (
                <tr key={invoice.id}>
                  <TableDataItem>{invoice.clientNumber}</TableDataItem>
                  <TableDataItem>{invoice.referenceDate}</TableDataItem>
                  <TableDataItem>
                    <Button
                      variant="primary"
                      onClick={() => handleDownload(invoice.id)}
                    >
                      <FaFilePdf />
                    </Button>
                  </TableDataItem>
                </tr>
              )}
            />
          </Card>
        </Section>
      )}
    </Container>
  );
}

export default Invoices;
