"use client";

import { useState } from "react";

const DateBadge = () => {
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date())
  );

  return <p className="text-[12px]">{date}</p>;
}
export default DateBadge;