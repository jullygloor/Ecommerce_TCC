import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CarrinhoScreen() {
  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([
    {
      id: "1",
      nome: "Salgadinho Doritos 110g Mostarda",
      preco: 10.9,
      imagem: require("../assets/robo1.png"),
      quantidade: 1,
      selecionado: false,
    },
    {
      id: "2",
      nome: "Salgadinho Doritos 110g Mostarda",
      preco: 10.9,
      imagem: require("../assets/robo2.png"),
      quantidade: 1,
      selecionado: false,
    },
    {
      id: "3",
      nome: "Salgadinho Doritos 110g Mostarda",
      preco: 10.9,
      imagem: require("../assets/robo3.png"),
      quantidade: 1,
      selecionado: false,
    },
  ]);

  const [selecionarTodos, setSelecionarTodos] = useState(false);

  // NOVO: estado para mostrar formulário de pagamento
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // NOVO: estados do formulário
  const [nomeTitular, setNomeTitular] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const toggleSelecionarTodos = () => {
    const novoValor = !selecionarTodos;
    setSelecionarTodos(novoValor);
    setProdutos((prev) =>
      prev.map((p) => ({ ...p, selecionado: novoValor }))
    );
  };

  const removerItem = (id) => {
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

  const toggleSelecionado = (id) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, selecionado: !p.selecionado } : p
      )
    );
  };

  // NOVO: calcular total dos produtos selecionados
  const total = produtos.reduce((acc, p) => {
    if (p.selecionado) {
      return acc + p.preco * p.quantidade;
    }
    return acc;
  }, 0);

  // NOVO: função para finalizar compra (pode validar formulário e enviar dados)
  const finalizarCompra = () => {
    if (!nomeTitular || !numeroCartao || !validade || !cvv) {
      alert("Por favor, preencha todos os dados do pagamento.");
      return;
    }
    alert(`Pagamento realizado com sucesso! Total: R$ ${total.toFixed(2)}`);
    // Aqui você pode limpar o carrinho, esconder formulário etc
    setMostrarFormulario(false);
    // Opcional: limpar formulário
    setNomeTitular("");
    setNumeroCartao("");
    setValidade("");
    setCvv("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.produtoCard}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          {
            backgroundColor: item.selecionado ? "#222" : "#fff",
            borderColor: item.selecionado ? "#222" : "#aaa",
          },
        ]}
        onPress={() => toggleSelecionado(item.id)}
      >
        {item.selecionado && (
          <Ionicons name="checkmark" size={18} color="#fff" />
        )}
      </TouchableOpacity>

      <Image source={item.imagem} style={styles.produtoImg} />

      <View style={{ flex: 1 }}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

        <View style={styles.linhaInferior}>
          <TouchableOpacity
            style={styles.removerBtn}
            onPress={() => removerItem(item.id)}
          >
            <Text style={styles.removerText}>Remover</Text>
          </TouchableOpacity>

          <View style={styles.quantidadeBox}>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, -1)}>
              <Ionicons name="remove" size={18} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantidadeText}>{item.quantidade}</Text>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, 1)}>
              <Ionicons name="add" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#888" />
            <TextInput
              placeholder="Pesquise um produto"
              style={styles.searchInput}
            />
            <Ionicons name="filter-outline" size={20} color="#888" />
          </View>
        </View>

        {!mostrarFormulario ? (
          <>
            {/* Selecionar todos */}
            <View style={styles.selectRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: selecionarTodos ? "#222" : "#fff",
                    borderColor: selecionarTodos ? "#222" : "#aaa",
                  },
                ]}
                onPress={toggleSelecionarTodos}
              >
                {selecionarTodos && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={styles.selectText}>Selecionar todos</Text>
            </View>

            {/* Lista de produtos */}
            <FlatList
              data={produtos}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* Total e botão finalizar */}
            {total > 0 && (
              <View style={styles.finalizarContainer}>
                <Text style={styles.totalText}>
                  Total: R$ {total.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.finalizarButton}
                  onPress={() => setMostrarFormulario(true)}
                >
                  <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.formTitle}>Dados Bancários</Text>

            <TextInput
              placeholder="Nome do titular"
              style={styles.input}
              value={nomeTitular}
              onChangeText={setNomeTitular}
            />
            <TextInput
              placeholder="Número do cartão"
              style={styles.input}
              keyboardType="numeric"
              value={numeroCartao}
              onChangeText={setNumeroCartao}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput
                placeholder="Validade (MM/AA)"
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                value={validade}
                onChangeText={setValidade}
              />
              <TextInput
                placeholder="CVV"
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.finalizarButton}
              onPress={finalizarCompra}
            >
              <Text style={styles.finalizarButtonText}>Pagar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.finalizarButton, { backgroundColor: "#ccc", marginTop: 10 }]}
              onPress={() => setMostrarFormulario(false)}
            >
              <Text style={[styles.finalizarButtonText, { color: "#000" }]}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  searchContainer: {
    marginTop: 50,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    outlineStyle: "none",
  },
  selectRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  selectText: {
    fontSize: 14,
    color: "#000",
  },
  produtoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    alignItems: "center",
  },
  produtoImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  preco: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  linhaInferior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removerBtn: {
    backgroundColor: "#F49393",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removerText: {
    color: "#000",
    fontWeight: "500",
  },
  quantidadeBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantidadeText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  finalizarContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finalizarButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  finalizarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formContainer: {
    paddingTop: 30,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
