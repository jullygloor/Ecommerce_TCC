import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Senha1Screen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userData } = route.params || {};

  const [senha, setSenha] = useState('');

  const handleNext = () => {
    if (senha.length >= 6) {
      const completeUserData = { ...userData, senha };
      console.log(completeUserData);
      navigation.navigate('Hello', { userData: completeUserData });
    } else {
      alert('A senha deve ter no mínimo 6 caracteres.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Crie sua senha</Text>

          <Text style={styles.subtitle}>
            Para continuar, defina uma senha segura para acessar sua conta.
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelWrapper}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#2D3145',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3d5894ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  cancelWrapper: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});
