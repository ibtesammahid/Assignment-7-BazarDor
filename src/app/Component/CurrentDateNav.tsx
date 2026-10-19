"use client";

import { useState } from "react";

const DateBadge = () => {
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date())
  );

  return (
    <p className="max-w-full wrap-break-words text-[11px] leading-relaxed text-gray-600 sm:text-xs">
      {date}
    </p>
  );
};

export default DateBadge;
