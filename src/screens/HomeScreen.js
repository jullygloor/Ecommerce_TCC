import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useEndereco } from "../components/EnderecoContext";

const { width } = Dimensions.get("window");
const comida = require("../assets/comida.png");

const promoSlides = [
  { id: "1", title: "Mega desconto em todos os snacks", discount: "50%", image: comida },
  { id: "2", title: "Ofertas imperdíveis no mercado", discount: "30%", image: comida },
];

const categories = [
  { id: "1", name: "Bebidas", image: comida },
  { id: "2", name: "Snacks", image: comida },
  { id: "3", name: "Mercado", image: comida },
  { id: "4", name: "Limpeza", image: comida },
];

const topProducts = [
  { id: "1", name: "Chocolate barrinha Snickers 45g", price: "R$12,00", rating: 4.8, image: comida },
  { id: "2", name: "Salgadinho Doritos 75g Sweet Chili", price: "R$12,00", rating: 4.8, image: comida },
];

export default function HomeScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { endereco } = useEndereco();

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const renderPromo = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={styles.promoCard}
      imageStyle={{ borderRadius: 12 }}
    >
      <Text style={styles.promoTitle}>{item.title}</Text>
      <Text style={styles.promoDiscount}>{item.discount}</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Order now</Text>
      </TouchableOpacity>
    </ImageBackground>
  );

  const renderTopProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("Produto", { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.productRating}>{item.rating} Avaliado</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ENDEREÇO E CARRINHO */}
        <View style={styles.addressContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="location-outline" size={20} color="#333" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.addressLabel}>Mercado mais próximo</Text>
              {endereco ? (
                <Text style={styles.addressText}>{endereco}</Text>
              ) : (
                <Text style={[styles.addressText, { color: "red" }]}>
                  Adicione seu endereço
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Carrinho")}
          >
            <Icon name="cart-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* PESQUISA */}
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Pesquise um produto"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <Icon name="options-outline" size={22} color="#999" />
        </View>

        {/* PROMOÇÕES */}
        <View style={styles.promoContainer}>
          <FlatList
            data={promoSlides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={(item) => item.id}
            renderItem={renderPromo}
          />
          <View style={styles.dotsContainer}>
            {promoSlides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeSlide === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* CATEGORIAS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Ver tudo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesRow}>
            {categories.map((cat) => (
              <View key={cat.id} style={styles.categoryItem}>
                <Image source={cat.image} style={styles.categoryCircle} />
                <Text style={styles.categoryText}>{cat.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* TOPS DA SEMANA */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tops da Semana</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Ver tudo</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderTopProduct}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  addressLabel: {
    fontSize: 12,
    color: "#888",
  },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cartButton: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },

  promoContainer: {
    marginTop: 15,
  },
  promoCard: {
    width: width - 40,
    height: 140,
    marginHorizontal: 20,
    padding: 15,
    justifyContent: "space-between",
    backgroundColor: "#2A2D7C",
    borderRadius: 12,
  },
  promoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    width: "70%",
  },
  promoDiscount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#000",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2A2D7C",
  },

  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 11,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sectionAction: {
    fontSize: 14,
    color: "#2A2D7C",
    borderRadius: 11,
  },

  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },

  productCard: {
    backgroundColor: "#fff",
    width: 180,
    marginHorizontal: 10,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  productImage: {
    width: "100%",
    height: 60,
    resizeMode: "contain",
    borderRadius: 8,
  },

  productName: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
  },

  productPrice: {
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 4,
    color: "#000",
  },

  productRating: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
});
