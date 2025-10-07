import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Olá, Gabriel!",
    description:
      "Apresentamos o mais novo sistema de compras do Brasil! Tem o dia agitado? Programe suas compras e retire no centro mais próximo",
    image: require("../assets/robo1.png"),
  },
  {
    key: "2",
    title: "Conheça a AURORA",
    description:
      "Nossos sistemas são projetados a partir da Inteligência da Atlas, a AURORA. Com ela você recebe recomendações, auxílio em compras e agilidade!",
    image: require("../assets/robo2.png"),
  },
  {
    key: "3",
    title: "Só o começo!",
    description:
      "Esse é um projeto em desenvolvimento. Seja um dos primeiros a testar e nos dar um feedback para lhe oferecer as melhores experiências!",
    image: require("../assets/robo3.png"),
  },
  {
    key: "4",
    title: "Está pronto?",
    description: "Dê uma navegada pelo app e aproveite o novo!",
    image: require("../assets/robo4.png"),
    last: true,
  },
];

export default function WelcomeCarouselScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event) => {
  const index = Math.round(event.nativeEvent.contentOffset.x / width);
  setCurrentIndex(index);
};


  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.key}
        decelerationRate={0.8} // carrossel mais lento
        snapToInterval={width}
        snapToAlignment="center"
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                {item.last && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
                  >
                    <Text style={styles.buttonText}>Vamos lá →</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {/* Dots de paginação */}
      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.85,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: height * 0.35,
    resizeMode: "cover",
  },
  textBox: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2c2c54",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 50, // subiu um pouco mais
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
