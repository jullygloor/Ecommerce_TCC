import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import PedidosScreen from "./src/screens/PedidosScreen.js";
import StartScreen from "./src/screens/StartScreen";
import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import EnderecoScreen from "./src/screens/EnderecoScreen";
import Senha1Screen from "./src/screens/Senha1Screen";
import WelcomeCarouselScreen from "./src/screens/WelcomeCarouselScreen.js";
import SenhaScreen from "./src/screens/SenhaScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FavoritosScreen from "./src/screens/FavoritosScreen.js";
import { EnderecoProvider } from "./src/components/EnderecoContext.js";
import ProfileScreen from './src/screens/ProfileScreen.js'
import CarrinhoScreen from './src/screens/CarrinhoScreen.js'
import { CarrinhoProvider } from './src/components/CarrinhoContext.js';
import ProdutoScreen from "./src/screens/ProdutoScreen.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// -------- BOTTOM TABS ----------
function BottomTabs() {
  return (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: "#5F607C",
    tabBarInactiveTintColor: "#999",
    tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "500",
    
    },
    tabBarStyle: {
      backgroundColor: "#fff",
      borderTopWidth: 0.5,
      borderTopColor: "#E8E8E8",
      height: 60,
      elevation: 0,  
       // Remove sombra no Android
    },
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;

      if (route.name === "Início") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Pedidos") {
        iconName = focused ? "receipt" : "receipt-outline";
      } else if (route.name === "Favoritos") {
        iconName = focused ? "heart" : "heart-outline";
      } else if (route.name === "Perfil") {
        iconName = focused ? "person" : "person-outline";
      }

      return <Icon name={iconName} size={22} color={color} />;
    },
  })}
>

      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// -------- APP PRINCIPAL ----------
export default function App() {
  return (
    <CarrinhoProvider>
      <EnderecoProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Endereco" component={EnderecoScreen} />
            <Stack.Screen name="Senha1" component={Senha1Screen} />
            <Stack.Screen name="Hello" component={WelcomeCarouselScreen} />
            <Stack.Screen name="Senha" component={SenhaScreen} />
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
            <Stack.Screen name="Produto" component={ProdutoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </EnderecoProvider>
    </CarrinhoProvider>
  );
}
