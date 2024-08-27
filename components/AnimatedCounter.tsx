"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({
  amount,
  prefix,
}: {
  amount: number;
  prefix: string;
}) => {
  return (
    <div>
      <CountUp end={amount} duration={2} decimals={2} prefix={prefix} />
    </div>
  );
};

export default AnimatedCounter;
