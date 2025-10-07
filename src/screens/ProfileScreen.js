import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <-- Importa

export default function PerfilScreen() {
  const navigation = useNavigation(); // <-- Hook de navegação

  const user = {
    name: "Juninho Oliveira",
    email: "juninooliveira@atlas.com",
    avatar: require("../assets/robo4.png"),
  };

  // Função para ir para a tela do carrinho
  const goToCarrinho = () => {
    navigation.navigate("Carrinho"); // Nome da tela que você cadastrou no seu stack
  };

  const handleEditarPerfil = () => console.log("Editar Perfil");
  const handleHistorico = () => console.log("Histórico de Pedidos");
  const handleCupons = () => console.log("Cupons");
  const handleSenha = () => console.log("Mudar Senha");
  const handleLogout = () => console.log("Sair");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Título e ícones do topo */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={goToCarrinho}>
            {/* Associa a função de navegação */}
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Restante do componente... */}
      <View style={styles.profileCard}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.option} onPress={handleEditarPerfil}>
        <MaterialIcons name="edit" size={22} color="#000" />
        <Text style={styles.optionText}>Editar Perfil</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleHistorico}>
        <Ionicons name="receipt-outline" size={22} color="#000" />
        <Text style={styles.optionText}>Histórico de Pedidos</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleCupons}>
        <FontAwesome5 name="ticket-alt" size={18} color="#000" />
        <Text style={styles.optionText}>Cupons</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleSenha}>
        <Ionicons name="lock-closed-outline" size={22} color="#000" />
        <Text style={styles.optionText}>Mudar Senha</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginLeft: 10,
    elevation: 2,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  userEmail: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E94F64",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
