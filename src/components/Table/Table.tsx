import React from "react";
import "./Table.css";
import { TableRow } from "../TableRow/TableRow";

type TableProps = {
  data: Array<[string, [number, number, number]]>;
  min: number;
};

export function Table({ data, min }: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr className="table__headRow">
          <th className="table__headData">Pair name/market</th>
          <th className="table__headData">First</th>
          <th className="table__headData">Second</th>
          <th className="table__headData">Third</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([title, values]) => <TableRow key={title} title={title} values={values} min={min} />)}
      </tbody>
    </table>
  );
}
