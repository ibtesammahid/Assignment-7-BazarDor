"use client";

import { useState } from "react";

const HeroDate = () => {
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date())
  );

  return <span>{date}</span>;
};

export default HeroDate;