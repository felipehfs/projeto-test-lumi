import { screen } from "@testing-library/react";
import Table from "./Table";
import { describe, test, expect } from "vitest";
import { renderWithTheme } from "../../utils/renderWithTheme";
import { TableDataItem } from "./Table.styles";

const data = [
    {
        "id":"1bcb74f2-13ba-4244-9937-211aaf638407",
        "clientNumber":"7202788969",
        "dueDate":"2023-07-12T03:00:00.000Z",
        "filename":"3001165684-06-2023.pdf",
        "price":109.23,
        "referenceDate":"JUN/2023",
        "scrapeDate":"2023-12-21T15:14:03.550Z",
        "cityContribution":41.19,
        "energyEletric":{
           "id":"7bdd0726-a758-4eb8-8729-a24af49c5929",
           "kwh":50,
           "price":0.90549576,
           "invoiceId":"1bcb74f2-13ba-4244-9937-211aaf638407"
        },
        "energyGdi":{
           "id":"03a40622-6f1f-45a2-a5f4-de52c66e4b1e",
           "kwh":771,
           "price":0.56269364,
           "invoiceId":"1bcb74f2-13ba-4244-9937-211aaf638407"
        },
        "energySceeIcms":{
           "id":"fe4e49bd-c07e-46be-afc3-b4479d94bd30",
           "kwh":771,
           "price":0.59224675,
           "invoiceId":"1bcb74f2-13ba-4244-9937-211aaf638407"
        }
     },
];

describe("Button test", () => {
  test("should a click call a function", () => {
    const headers = ["Id cliente", "Referente á"];
   
    renderWithTheme(<Table headers={headers} data={data} renderItem={
        (invoice) => (
            <tr key={invoice.id}>
            <TableDataItem>{invoice.clientNumber}</TableDataItem>
            <TableDataItem>{invoice.referenceDate}</TableDataItem>
            </tr>
        )
    }/>);

    expect(screen.getByText(data[0].referenceDate)).toBeTruthy();
    expect(screen.getByText(data[0].clientNumber)).toBeTruthy();
  });
});
