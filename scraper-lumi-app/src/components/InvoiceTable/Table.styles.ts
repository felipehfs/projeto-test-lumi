import styled from "@emotion/styled";

export const Wrapper = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
`;

export const TableDataItem = styled.td`
  text-align: center;
  font-size: 1.4rem;
`;
export const TableHeaderItem = styled.td`
  text-align: center;
  font-size: 1.6rem;
  padding: 0.8rem;
  font-weight: bold;
`;
