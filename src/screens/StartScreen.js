import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/SacolaLogo.png')} style={styles.logo} />

      {/* Título */}
      <Text style={styles.title}>lojinha</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        De uma ideia de TCC para um{'\n'}país inteiro 🚛
      </Text>

      {/* Botão Começar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      {/* Link Entrar */}
      <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem uma conta? Entrar</Text>
        <Ionicons name="arrow-forward-circle" size={20} color="#0057ff" style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0057ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#111',
  },
});
