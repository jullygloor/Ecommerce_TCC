// src/screens/EnderecoContext.js
import React, { createContext, useState, useContext } from "react";

const EnderecoContext = createContext();

export const EnderecoProvider = ({ children }) => {
  const [endereco, setEndereco] = useState("");

  return (
    <EnderecoContext.Provider value={{ endereco, setEndereco }}>
      {children}
    </EnderecoContext.Provider>
  );
};

export const useEndereco = () => useContext(EnderecoContext);
