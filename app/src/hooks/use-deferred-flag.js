import { useState, useEffect } from "react";

const useDeferredFlag = (delay = 250) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return value;
};

export default useDeferredFlag;
