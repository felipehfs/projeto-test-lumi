import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Container, Header, Search, Main, Section } from "./Home.styles";
import Button from "../../components/Button/Button";
import ChartItem, {
  ChartItemProps,
} from "../../components/ChartItem/ChartItem";
import TextInput from "../../components/TextInput/TextInput";
import { Invoice } from "../../models/Invoices";
import { api } from "../../services/api";
import InvoiceTable from "../../components/InvoiceTable/Table";
import { TableDataItem } from "../../components/InvoiceTable/Table.styles";
import { formatMoney } from "../../utils/formatMoney";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useNavigate, useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const headers = [
  "Número do cliente",
  "Mês referente",
  "Preço a pagar",
  "Vencimento",
  "Energia elétrica(kwh)",
  "Energia elétrica(R$)",
  "Energia SCEEE s/ICMS (kwh)",
  "Energia SCEEE s/ICMS (R$)",
  "Energia Compensada GD I (kwh)",
  "Energia Compensada GD I (R$)",
  "Contribui ilum pública (R$)",
];

function Home() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientNumber, setClientNumber] = useState(params.id || "");
  const [cosumeStats, setConsumeStats] = useState<ChartItemProps>({
    categories: [],
    series: [],
  });
  const [costStats, setCostStats] = useState<ChartItemProps>({
    categories: [],
    series: [],
  });

  function updateCostStats(data: Invoice[]) {
    const energyReferencesDate = data.map((item) => item.referenceDate);
    const totalValueWithoutGD = data.map(
      (item) =>
        item.energyEletric.price +
        item.energySceeIcms.price +
        item.cityContribution,
    );
    const economyGD = data.map((item) => item.energyGdi.price);

    console.log(totalValueWithoutGD);
    setCostStats({
      categories: energyReferencesDate,
      series: [
        {
          name: "Valor Total sem GD",
          data: totalValueWithoutGD,
          color: "#000000",
        },
        {
          name: "Valor Total sem GD",
          data: economyGD,
          color: "#04aeec",
        },
      ],
    });
  }

  function updateConsumeStats(data: Invoice[]) {
    const energyReferencesDate = data.map((item) => item.referenceDate);
    const energyEletric = data.map(
      (item) => item.energyEletric.kwh + item.energySceeIcms.kwh,
    );
    const energyGdi = data.map((item) => item.energyGdi.kwh);

    setConsumeStats({
      categories: energyReferencesDate,
      series: [
        {
          name: "Consumo de Energia Elétrica",
          data: energyEletric,
          color: "#000000",
        },
        {
          name: "Energia Compensada",
          data: energyGdi,
          color: "#04aeec",
        },
      ],
    });
  }

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get(`invoices?clientNumber=${params.id}`);
      setInvoices(response.data);
      updateConsumeStats(response.data);
      updateCostStats(response.data);
    }

    if (params.id?.trim()) {
      fetchApi();
    }
  }, [params.id]);

  const onChangeClientNumber: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setClientNumber(event.target.value);
  };

  const handleSubmitSearchClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/${clientNumber}`);
  };

  const handleRedirectToInvoices = () => {
    navigate(`/${clientNumber}/invoices`);
  };

  return (
    <Container>
      <Header>
        <h1>Controle de gastos</h1>
        <Search onSubmit={handleSubmitSearchClient}>
          <TextInput
            value={clientNumber}
            onChange={onChangeClientNumber}
            label="Id do cliente"
            id="clientNumber"
          />
          <Button type="submit">
            <FaSearch /> Pesquisar
          </Button>
        </Search>
      </Header>
      {invoices.length === 0 ? <EmptyState /> : null}
      {invoices.length > 0 && (
        <>
          <Main>
            <ChartItem
              categories={cosumeStats.categories}
              series={cosumeStats.series}
            />
            <ChartItem
              categories={costStats.categories}
              series={costStats.series}
            />
          </Main>
          <Section>
            <header>
              <Button variant="primary" onClick={handleRedirectToInvoices}>
                <FaFilePdf /> Faturas
              </Button>
            </header>
            <InvoiceTable
              headers={headers}
              renderItem={(invoice) => (
                <tr key={invoice.id}>
                  <TableDataItem>{invoice.clientNumber}</TableDataItem>
                  <TableDataItem>{invoice.referenceDate}</TableDataItem>
                  <TableDataItem>{formatMoney(invoice.price)}</TableDataItem>
                  <TableDataItem>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableDataItem>
                  <TableDataItem>{invoice.energyEletric.kwh}</TableDataItem>
                  <TableDataItem>
                    {formatMoney(invoice.energyEletric.price)}
                  </TableDataItem>
                  <TableDataItem>{invoice.energySceeIcms.kwh}</TableDataItem>
                  <TableDataItem>
                    {formatMoney(invoice.energySceeIcms.price)}
                  </TableDataItem>
                  <TableDataItem>{invoice.energyGdi.kwh}</TableDataItem>
                  <TableDataItem>
                    {formatMoney(invoice.energyGdi.price)}
                  </TableDataItem>
                  <TableDataItem>
                    {formatMoney(invoice.cityContribution)}
                  </TableDataItem>
                </tr>
              )}
              data={invoices}
            />
          </Section>
        </>
      )}
    </Container>
  );
}

export default Home;
