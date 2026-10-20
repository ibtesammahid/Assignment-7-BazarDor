
"use client";

import { useSyncExternalStore } from "react";

const getDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const subscribe = () => () => {};

const HeroDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    getDate,
    () => "আজকের তারিখ"
  );

  return <span>{date}</span>;
};

export default HeroDate;
