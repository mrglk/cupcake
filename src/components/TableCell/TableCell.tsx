import { memo } from "react";
import "./TableCell.css";

type CellProps =  {
    data: string;
    min?: number;
  };

export const TableCell = memo(({ data, min }: CellProps) => {
  return <td className={!min || (min !== Number(data))? "cell" : "cell cell--highlight"}>{data}</td>;
})
