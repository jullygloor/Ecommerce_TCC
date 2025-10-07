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
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';



// Schema de validação com YUP
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email ou nome de usuário é obrigatório')
    .test('is-email-or-username', 'Insira um e-mail válido ou nome de usuário', value => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_.-]{3,}$/; // mínimo 3 caracteres alfanuméricos (com . _ -)
      return emailRegex.test(value) || usernameRegex.test(value);
    }),
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = data => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Senha', { email: data.email });
      }, 2000);
    };
  
  const [loading, setLoading] = useState(false);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

    <Spinner
        visible={loading}
        textContent={"Carregando..."}
        textStyle={{ color: '#FFF' }}
        overlayColor="rgba(0, 0, 0, 0.6)"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.circleBlue}></View>
          <View style={styles.circleLight}></View>

          <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>Bem vindo novamente</Text>

            <View style={styles.inputWrapper}> 
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Email/Nome de usuário"
                  placeholderTextColor="#c4c4c4"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>

           <TouchableOpacity onPress={() => navigation.navigate('Start')}>
               <Text style={styles.cancelText}>Cancelar</Text>
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
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    zIndex: 1,
    marginTop: 150,
  },
  inputWrapper: { marginBottom: 20 },
  title: { fontSize: 36, fontWeight: '700', color: '#3E2A1F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6e6e6e', marginBottom: 30 },
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
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#0645FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  cancelText: { color: '#6e6e6e', fontSize: 14, textAlign: 'center' },

  inputError: {
    borderWidth: 1.5,
    borderColor: '#ff4d4d',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,

  },
});
