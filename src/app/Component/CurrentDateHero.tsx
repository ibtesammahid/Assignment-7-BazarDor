"use client";

import { useState } from "react";

const HeroDate = () => {
  const [date] = useState(() => {
    return new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date());
  });

  return (
    <span className="inline-flex max-w-full items-center justify-center rounded-full bg-[#E1F2E8] px-3 py-2 text-center text-xs font-medium leading-relaxed text-[#008C45] sm:px-5 sm:py-2 sm:text-sm md:px-6">
      {date}
    </span>
  );
};

export default HeroDate;
