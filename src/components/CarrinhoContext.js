import React, { createContext, useState } from 'react';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (produto) => {
    const existe = produtos.find((p) => p.id === produto.id);
    if (existe) {
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        )
      );
    } else {
      setProdutos([...produtos, { ...produto, quantidade: 1 }]);
    }
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const alterarQuantidade = (id, delta) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: Math.max(1, p.quantidade + delta) }
          : p
      )
    );
  };

  const limparCarrinho = () => setProdutos([]);

  return (
    <CarrinhoContext.Provider
      value={{
        produtos,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
