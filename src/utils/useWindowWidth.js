import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    window.addEventListener(`resize`, () => setWindowWidth(window.innerWidth));

    setWindowWidth(window.innerWidth);

    return () =>
      window.removeEventListener(`resize`, () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  return windowWidth;
};

export default useWindowWidth;
