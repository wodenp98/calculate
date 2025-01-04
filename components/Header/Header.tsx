import Image from "next/image";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white shadow-md mb-8">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href="/">Calculs</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
