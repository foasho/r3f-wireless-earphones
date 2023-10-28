import React from "react";

const ResizeContext = React.createContext({ isMd: false, size: { width: 0, height: 0 } });
export const useResize = () => React.useContext(ResizeContext);

export const ResizeProvider = ({ children }: { children: React.ReactNode }) => {

  const [isMounted, setIsMounted] = React.useState(false);
  const [isMd, setIsMd] = React.useState(false);
  const size = React.useRef({ width: 0, height: 0 });

  React.useEffect(() => {
    const handleResize = () => {
      size.current.width = window.innerWidth;
      size.current.height = window.innerHeight;
      setIsMd(window.innerWidth > 768);
      setIsMounted(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResizeContext.Provider 
      value={{
        isMd,
        size: size.current
      }}
    >
      {isMounted && children}
    </ResizeContext.Provider>
  )
}

