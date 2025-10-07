import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Importação para navegação

const pedidosMock = [
  {
    id: "1",
    nome: "Salgadinho Doritos 110g Mostarda",
    preco: "R$10,90",
    quantidade: 1,
    status: "Cancelar",
    imagem: require("../assets/robo1.png"),
  },
  {
    id: "2",
    nome: "Nabisco Oreo Chocolate Sandwich Cookies",
    preco: "R$4,75",
    quantidade: 1,
    status: "Em preparo",
    imagem: require("../assets/robo2.png"),
  },
  {
    id: "3",
    nome: "Nestlé Caixa Bombom Especialidades 251g",
    preco: "R$14,50",
    quantidade: 1,
    status: "Cancelar",
    imagem: require("../assets/robo3.png"),
  },
  {
    id: "4",
    nome: "Pipoca Yoki Microondas Bacon 100g",
    preco: "R$4,89",
    quantidade: 2,
    status: "Cancelar",
    imagem: require("../assets/robo4.png"),
  },
];

export default function PedidosScreen() {
  const navigation = useNavigation(); // Hook de navegação

  const [pedidos, setPedidos] = useState(pedidosMock);
  const [search, setSearch] = useState("");

  // Função para navegar para a tela Carrinho
  const goToCarrinho = () => {
    navigation.navigate("Carrinho"); // Ajuste o nome da tela se for diferente
  };

  const aumentarQuantidade = (id) => {
    setPedidos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setPedidos((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const cancelarItem = (id) => {
    Alert.alert("Cancelar item", "Deseja remover este item?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () =>
          setPedidos((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  // Filtrando com base na pesquisa
  const pedidosFiltrados = pedidos.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>{item.preco}</Text>

        {item.status === "Em preparo" ? (
          <Text style={styles.preparo}>{item.status}</Text>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => cancelarItem(item.id)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>

            <View style={[styles.counter, { marginLeft: 12 }]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => diminuirQuantidade(item.id)}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantidade}>{item.quantidade}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => aumentarQuantidade(item.id)}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Icon name="location-outline" size={20} color="#333" />
        <Text style={styles.endereco}>Av. da Saudade, 125 - Pta...</Text>

        {/* Ícone do carrinho clicável */}
        <TouchableOpacity
          onPress={goToCarrinho}
          style={{ marginLeft: "auto" }}
        >
          <Icon name="cart-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* BARRA DE PESQUISA */}
      <View style={styles.searchBox}>
        <Icon name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Pesquise um produto"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <Icon name="options-outline" size={20} color="#999" />
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={pedidosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  endereco: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    color: "#2A2D7C",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginHorizontal: 5,
    fontSize: 14,
    color: "#333",
    outlineStyle: "none",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 12,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 8,
  },
  details: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  nome: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  cancelar: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  preparo: {
    fontSize: 13,
    fontWeight: "500",
    color: "#777",
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2A2D7C",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  btn: {
    paddingHorizontal: 6,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2D7C",
  },
  quantidade: {
    fontSize: 14,
    marginHorizontal: 6,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 40,
  },
});
