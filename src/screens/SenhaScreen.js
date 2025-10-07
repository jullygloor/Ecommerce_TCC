import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Avatar from '../assets/avatar.png';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  password: yup.string().required('A senha é obrigatória').min(4, 'Mínimo 4 caracteres'),
});

export default function SenhaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = ({ password }) => {
    if (password === '1234') {
      alert('Login realizado com sucesso!');
    } else {
      alert('Senha incorreta!');
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
          <View style={styles.circleBlue}></View>
          <View style={styles.circleLight}></View>

          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Image source={Avatar} style={styles.avatar} />
            </View>

            <Text style={styles.greeting}>Olá, {email || 'Usuário'}</Text>
            <Text style={styles.label}>Insira sua senha</Text>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </>
              )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.labelPassword}>Esqueceu a Senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.actionText}>Não é você? ➔</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleBlue: {
    position: 'absolute',
    top: -120,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#0645FF',
    zIndex: 0,
  },
  circleLight: {
    position: 'absolute',
    top: 200,
    right: -80,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#A3CFFF',
    zIndex: 0,
  },
  container: {
    marginTop: 120,
    width: '85%',
    alignItems: 'center',
    zIndex: 1,
  },
  avatarContainer: {
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#fff',
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  greeting: { fontSize: 24, fontWeight: '700', marginTop: 20 },
  label: { fontSize: 16, color: '#555', marginTop: 5 },
  labelPassword: { fontSize: 14, color: 'red', marginTop: 15 },
 
  input: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 22,
    fontSize: 17,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderColor: 'transparent',
    width: '100%',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#0645FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  actionText: { color: '#0057FF', fontWeight: '600', fontSize: 16, marginTop: 20 },

  inputError: {
    borderColor: '#ff375b',
    borderWidth: 1,
    shadowOpacity: 0,
    elevation: 0,
  },

  errorText: {
    color: '#ff375b',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
    alignSelf: 'flex-start',
  },
});
