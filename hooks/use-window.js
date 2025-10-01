import * as React from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: null,
    height: null,
  });
  React.useLayoutEffect(() => {
    const onWindowSizeChange = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onWindowSizeChange();
    window.addEventListener("resize", onWindowSizeChange);
    return () => {
      window.removeEventListener("resize", onWindowSizeChange);
    };
  }, []);
  return windowSize;
};

export default useWindowSize;
