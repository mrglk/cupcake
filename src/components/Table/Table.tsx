import React from 'react';
import "./Table.css";
import { TableRow } from "../TableRow/TableRow";
import useLongpoll from "../../hooks/useLongpoll";

type Data = {
  [key: string]: number
}

type ArrayData = {
  [key: string]: [number, number, number]
}

const FIRST_ENDPOINTS = {
    path: "/first",
    longpoll: "/first/poll",
};

const SECOND_ENDPOINTS = {
  path: "/second",
  longpoll: "/second/poll",
};

const THIRD_ENDPOINTS = {
  path: "/third",
  longpoll: "/third/poll",
};

const updateData = (firstData: Data, secondData: Data, thirdData: Data): ArrayData => {
  return {
    'RUB/CUPCAKE': [firstData.RUB, secondData.RUB, thirdData.RUB],
    'USD/CUPCAKE': [firstData.USD, secondData.USD, thirdData.USD],
    'EUR/CUPCAKE': [firstData.EUR, secondData.EUR, thirdData.EUR],
    'RUB/USD': [firstData.RUB / firstData.USD, secondData.RUB / secondData.USD, thirdData.RUB / thirdData.USD],
    'RUB/EUR': [firstData.RUB / firstData.EUR, secondData.RUB / secondData.EUR, thirdData.RUB / thirdData.EUR],
    'EUR/USD': [firstData.USD / firstData.EUR, secondData.USD / secondData.EUR, thirdData.USD / thirdData.EUR]
  }
}

const getMinValue = (data: ArrayData) => {
    return Number(Math.min(...Object.values(data).flat()).toFixed(2));
};

export function Table() {
  const firstData = useLongpoll(FIRST_ENDPOINTS);
  const secondData  = useLongpoll(SECOND_ENDPOINTS);
  const thirdData = useLongpoll(THIRD_ENDPOINTS);

  if (!firstData || !secondData || !thirdData) {
    return (
      <p>Соединение...</p>
    )
  }

  const allData = updateData(firstData, secondData, thirdData);
  const dataArray = Object.entries(allData);
  const minValue = getMinValue(allData);

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
        {dataArray.map(([title, values]) => <TableRow key={title} title={title} values={values} min={minValue}/>)}
      </tbody>
    </table>
  );
}