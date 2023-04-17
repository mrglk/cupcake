import { memo } from "react";
import { TableCell } from "../TableCell/TableCell";

type RowProps = {
  title: string;
  values: [number, number, number];
  min: number;
};

const formatNumber = (num: number) => {
  return num.toFixed(2);
};

export const TableRow = memo(({ title, values, min }: RowProps) => {
  return (
    <tr>
      <TableCell data={title} />
      {values.map((value) => <TableCell key={value} data={formatNumber(value)} min={min} />)}
    </tr>
  );
});