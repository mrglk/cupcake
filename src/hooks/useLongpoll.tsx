import React from "react";
import { useEffect, useState, useCallback } from "react";

type Enpoints = {
  [key: string]: string;
};

type EndpointData = {
  [key: string]: number;
}

const SERVER = "http://localhost:3000/api/v1";

export default function useLongpoll({ path, longpoll }: Enpoints) {
  const [data, setData] = useState<EndpointData | null>(null);

  const fetchData = useCallback(() => {
    fetch(`${SERVER}${path}`)
      .then((response) => response.json())
      .then((data) => setData(data.rates))
      .catch((e) => console.log(e));
  }, []);

  const fetchUpdates = useCallback(() => {
    fetch(`${SERVER}${longpoll}`)
      .then((response) => response.json())
      .then((data) => setData(data.rates))
      .then(() => fetchUpdates())
      .catch((e) => {
        console.log(e);
        setTimeout(fetchUpdates, 1000);
      });
  }, []);

  useEffect(() => {
    fetchData();
    fetchUpdates();
  }, []);

  return data;
}
