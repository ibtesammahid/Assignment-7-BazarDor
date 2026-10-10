"use client";

import { useState } from "react";

const HeroDate = () => {
  const [date] = useState(() => {
    const currentDate = new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    return currentDate;
  });
  
  return <span className="inline-flex items-center rounded-full bg-[#E1F2E8] px-6 py-1 text-sm font-medium text-[#008C45]">
          {date}
        </span>;
}
export default HeroDate;