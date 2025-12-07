"use client";

import dynamic from "next/dynamic";

// Carga diferida, SIN SSR
const PruebaModelo = dynamic(() => import("./components/PruebaModelo"), {
  ssr: false
});

export default function Page() {
  return <PruebaModelo />;
}
