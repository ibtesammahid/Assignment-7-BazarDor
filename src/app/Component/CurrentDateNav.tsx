
"use client";

import { useSyncExternalStore } from "react";

const getDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const subscribe = () => () => {};

const DateBadge = () => {
  const date = useSyncExternalStore(
    subscribe,
    getDate,
    () => "আজকের তারিখ"
  );

  return (
    <p className="max-w-full wrap-break-words text-[11px] leading-relaxed text-gray-600 sm:text-xs">
      {date}
    </p>
  );
};

export default DateBadge;
