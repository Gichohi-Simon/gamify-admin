"use client";

import React from "react";
import clsx from "clsx";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <p
      className={clsx(
        "font-raleway text-base font-semibold tracking-wider capitalize",
        className,
      )}
    >
      {children}
    </p>
  );
}
