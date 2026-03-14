"use client";

import { useEffect } from "react";

const ScrollToTopOnLoad = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
};

export default ScrollToTopOnLoad;
