import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function ProdutoScreen({ route, navigation }) {
  const { product } = route.params;

  // Simulando múltiplas imagens para o carrossel
  const images = product.images || [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tab, setTab] = useState("Descrição");
  const [quantidade, setQuantidade] = useState(1);

  const flatListRef = useRef();

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveImageIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={26} color="#000" />
        </TouchableOpacity>

        {/* Carrossel de Imagens */}
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item }) => (
            <Image source={item} style={styles.productImage} />
          )}
          style={{ marginTop: 70 }}
        />

        {/* Indicadores de página */}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeImageIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Título e preço */}
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productId}>id: 001</Text>
        <Text style={styles.productPrice}>{product.price}</Text>

        {/* Abas */}
        <View style={styles.tabsContainer}>
          {["Descrição", "Item", "Adicional"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabButton, tab === t && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo das abas */}
        {tab === "Descrição" && (
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>
              {product.description ||
                "Delicioso produto feito com ingredientes selecionados para garantir qualidade e sabor incomparáveis."}
            </Text>
          </View>
        )}

        {tab === "Item" && (
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Produto Vegano?</Text>
              <Text style={styles.infoValue}>{product.vegan ? "Sim" : "Não"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ingredientes</Text>
              <Text style={styles.infoValue}>
                {product.ingredients ||
                  "Açúcar, amendoim, xarope de glicose, leite em pó, manteiga de cacau, gordura vegetal, massa de cacau, lactose, permeado de soro de leite em pó, gordura láctea, sal, clara de ovo em pó, emulsificantes lecitina de soja, sais de amônio do ácido fosfatídico e poliglicerol polirricinoleato e aromatizantes."}
              </Text>
            </View>
          </View>
        )}

        {tab === "Adicional" && (
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>
              Adicione acompanhamentos e complementos para deixar seu pedido ainda mais especial.
            </Text>
            {/* Você pode adicionar botões ou opções aqui para o usuário escolher adicionais */}
          </View>
        )}

        {/* Espaço extra para o botão fixo */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Rodapé com quantidade e botão */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => {
            if (quantidade > 1) setQuantidade(quantidade - 1);
          }}
        >
          <Icon name="remove-outline" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.qtyText}>{quantidade} unidade{quantidade > 1 ? "s" : ""}</Text>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => setQuantidade(quantidade + 1)}
        >
          <Icon name="add-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ------------------- ESTILOS -------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  productImage: {
    width: width,
    height: 250,
    resizeMode: "contain",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#1C2340",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  productId: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#1C2340",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "#1C2340",
  },
  tabText: {
    fontSize: 14,
    color: "#1C2340",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  infoBox: {
    marginHorizontal: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  qtyButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
    minWidth: 50,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#1C2340",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
