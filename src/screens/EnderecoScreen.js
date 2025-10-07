import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { useEndereco } from '../components/EnderecoContext';

// Validação dos campos
const schema = yup.object().shape({
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  complemento: yup.string(),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório'),
});

export default function EnderecoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params || {}; // dados recebidos do cadastro inicial
  const [loading, setLoading] = useState(false);
  const { setEndereco } = useEndereco();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

// Dentro do onSubmit:
const onSubmit = (data) => {
  try {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const fullUserData = { ...userData, ...data };

      const enderecoFormatado = `${data.logradouro}, ${data.numero}${
        data.complemento ? ' - ' + data.complemento : ''
      } - ${data.cidade}/${data.estado}`;

      setEndereco(enderecoFormatado);

      navigation.replace('Senha1', { userData: fullUserData });
    }, 2000);
  } catch (error) {
    console.error("Erro no EnderecoScreen:", error);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Carregando...'}
        textStyle={{ color: '#FFF' }}
        overlayColor="rgba(0, 0, 0, 0.6)"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Seu{'\n'}endereço</Text>

          {[
            { name: 'cep', placeholder: 'CEP', keyboardType: 'numeric' },
            { name: 'logradouro', placeholder: 'Logradouro' },
            { name: 'numero', placeholder: 'Número', keyboardType: 'numeric' },
            { name: 'complemento', placeholder: 'Complemento' },
          ].map(({ name, placeholder, keyboardType }) => (
            <View key={name} style={styles.inputWrapper}>
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors[name] && styles.inputError]}
                    placeholder={placeholder}
                    placeholderTextColor="#ccc"
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors[name] && (
                <Text style={styles.errorText}>{errors[name]?.message}</Text>
              )}
            </View>
          ))}

          <View style={styles.row}>
            <View style={{ flex: 2, marginRight: 10 }}>
              <Controller
                control={control}
                name="cidade"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.cidade && styles.inputError]}
                    placeholder="Cidade"
                    placeholderTextColor="#ccc"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.cidade && (
                <Text style={styles.errorText}>{errors.cidade.message}</Text>
              )}
            </View>

            <View style={{ flex: 1, minWidth: 80 }}>
              <Controller
                control={control}
                name="estado"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.estado && styles.inputError]}
                    placeholder="Estado"
                    placeholderTextColor="#ccc"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.estado && (
                <Text style={styles.errorText}>{errors.estado.message}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Feito!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 40,
    color: '#000',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
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
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#0645FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    shadowColor: '#0645FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
});
