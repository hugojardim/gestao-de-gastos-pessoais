import { createContext, useState } from "react";

export const TotalGastosContext = createContext();

export const TotalGastosProvider = ({ children }) => {
  const [gastosContext, setGastosContext] = useState([]);

  return (
    <TotalGastosContext.Provider value={{ gastosContext, setGastosContext }}>
      {children}
    </TotalGastosContext.Provider>
  );
};