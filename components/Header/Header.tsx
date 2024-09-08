import Image from "next/image";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="p-4">
      <Link href="/" className="text-4xl">
        Calculs
      </Link>
    </div>
  );
};
