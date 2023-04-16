import React from 'react';
import { useEffect, useState, useCallback } from "react";

type Enpoints = {
    [key: string]: string
  }

const SERVER = "http://localhost:3000/api/v1";
const THROTTLE_INTERVAL = 100;

export default function useThrottledApi({ path, longpoll }: Enpoints) {
  const [data, setData] = useState<any>({});

  const fetchData = useCallback(() => {
    fetch(`${SERVER}${path}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
  }, []);

  const fetchUpdates = useCallback(() => {
    fetch(`${SERVER}${longpoll}`)
      .then(() => fetchData())
      .catch((e) => console.log(e));
  }, []);

  const throttledFetchUpdates = useCallback(
    throttle(fetchUpdates, THROTTLE_INTERVAL),
    [fetchUpdates]
  );

    useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(throttledFetchUpdates, THROTTLE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchData, throttledFetchUpdates]);

  return data.rates;
}

  function throttle(func: Function, interval: number) {
    let lastExecTime = 0;
    let timeoutId: number;
  
    return (...args: any[]) => {
      const now = Date.now();
  
      if (now - lastExecTime < interval) {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          lastExecTime = now;
          func(...args);
        }, interval - (now - lastExecTime));
      } else {
        lastExecTime = now;
        func(...args);
      }
    };
  }  