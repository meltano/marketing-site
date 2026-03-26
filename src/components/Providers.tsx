"use client";

import { useEffect } from "react";
import Modal from "react-modal";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);
  return <>{children}</>;
}
