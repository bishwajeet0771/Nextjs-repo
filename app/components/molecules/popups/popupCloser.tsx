/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useHistoryBackHandler = (handleClose: any) => {
  useEffect(() => {
    const handlePopState = () => {
      document.body.style.overflow = "unset";
      handleClose ? handleClose() : "";
      // window.history.replaceState(null, "", window.location.href);
      window.history.back();
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pushHistory = () => {
    // window.history.pushState("reqCallModal", "");
    window.history.pushState(null, "", window.location.href);
  };

  return pushHistory;
};

export default useHistoryBackHandler;
