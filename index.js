import { useEffect, useState, useRef } from "react";

export function useOffLineDetector({
  pollUrl,
  pollingInterval,
  fetchTimeout,
  handleChange,
}) {
  const [online, setOnline] = useState(navigator.onLine);
  const interval = useRef(0);
  const timeout = fetchTimeout ? fetchTimeout : 1000;
  const pollInterval = pollingInterval ? pollingInterval : 5000;
  const url = pollUrl ? pollUrl : "./favicon.ico";

  useEffect(() => {
    interval.current = setInterval(() => {
      fetchWithTimeout(url)
        .then(() => {
          handleOnline();
        })
        .catch((error) => {
          handleOffline();
        });
    }, pollInterval);

    async function fetchWithTimeout(resource) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(resource, {
          signal: controller.signal,
        });
        return response;
      } catch (e) {
        return Promise.reject(e);
      } finally {
        clearTimeout(id);
      }
    }

    function fireCallback() {
      if (typeof handleChange === "function") {
        handleChange(); //callback
      }
    }

    function handleOnline() {
      setOnline((current) => {
        if (!current) {
          fireCallback(true);
        }
        return true;
      });
    }

    function handleOffline() {
      setOnline((current) => {
        if (current) {
          fireCallback(false);
        }
        return false;
      });
    }

    function handleNavigatorOnline() {
      setOnline(true);
      fireCallback();
    }

    function handleNavigatorOffline() {
      setOnline(false);
      fireCallback();
    }

    window.addEventListener("online", handleNavigatorOnline);
    window.addEventListener("offline", handleNavigatorOffline);

    return () => {
      clearInterval(interval.current);
      window.removeEventListener("online", handleNavigatorOnline);
      window.removeEventListener("offline", handleNavigatorOffline);
    };
  }, []);

  return online;
}
