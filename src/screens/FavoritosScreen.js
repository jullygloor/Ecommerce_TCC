import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const favoritosMock = [
  {
    id: "1",
    nome: "Chocolate barrinha Snickers 45g",
    preco: "R$4,50",
    nota: "4.9",
    imagem: require("../assets/robo1.png"),
  },
  {
    id: "2",
    nome: "Salgadinho Doritos Sabor Queijo Nacho 300g",
    preco: "R$11,00",
    nota: "4.7",
    imagem: require("../assets/robo2.png"),
  },
  {
    id: "3",
    nome: "Bombom Lacta Favoritos Caixa 250,6g",
    preco: "R$14,00",
    nota: "4.8",
    imagem: require("../assets/robo3.png"),
  },
  {
    id: "4",
    nome: "Cookie Gotas De Baunilha Negresco 60g",
    preco: "R$2,96",
    nota: "4.8",
    imagem: require("../assets/robo4.png"),
  },
];

export default function FavoritosScreen() {
  const [search, setSearch] = useState("");

  const favoritosFiltrados = favoritosMock.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} resizeMode="contain" />

      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>{item.preco}</Text>

      <View style={styles.notaContainer}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={styles.notaTexto}>{item.nota} Avaliado</Text>
      </View>

      <TouchableOpacity style={styles.btnFavorito}>
        <Text style={styles.btnText}>Favoritado</Text>
        <Ionicons name="star" size={16} color="#FFD700" style={{ marginLeft: 4 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um produto"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="options-outline" size={18} color="#999" />
      </View>

      {/* Grid */}
      <FlatList
        data={favoritosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1A1B3A",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 20,
    height: 42,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: "#333",
    outlineStyle: 'none',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "48%",
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  nome: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1B3A",
    marginBottom: 4,
  },
  preco: {
    fontSize: 13,
    fontWeight: "500",
    color: "#444",
    marginBottom: 4,
  },
  notaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notaTexto: {
    fontSize: 12,
    marginLeft: 4,
    color: "#666",
  },
  btnFavorito: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingVertical: 6,
    borderRadius: 12,
    justifyContent: "center",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1A1B3A",
  },
});
