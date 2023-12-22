import { Invoice } from "../../models/Invoices";
import { Wrapper, TableHeaderItem } from "./Table.styles";

type InvoiceTableProps = {
  data: Invoice[];
  headers: string[];
  renderItem: (invoice: Invoice) => JSX.Element;
};

export default function InvoiceTable({
  data,
  headers,
  renderItem,
}: InvoiceTableProps) {
  return (
    <Wrapper>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeaderItem key={header}>{header}</TableHeaderItem>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((invoice) => renderItem(invoice))}</tbody>
    </Wrapper>
  );
}
