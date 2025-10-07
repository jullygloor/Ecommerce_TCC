import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from 'react-native-loading-spinner-overlay';


// Schema de validação com YUP
const schema = yup.object().shape({
  name: yup.string().min(6, 'Mínimo 6 caracteres').required('Nome é obrigatório'),
  age: yup
    .number()
    .typeError('Idade inválida')
    .min(1, 'Mínimo 1 ano')
    .max(120, 'Máximo 120 anos')
    .required('Idade é obrigatória'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
  phone: yup
    .string()
    .required('Telefone obrigatório')
    .test('is-valid-phone', 'Telefone incompleto', value => {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10;
    }),
});

export default function SignupScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode] = useState('+55');
  const [phoneEmoji, setPhoneEmoji] = useState('😎');
  const [loading, setLoading] = useState(false);

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
      const userData = {
        ...data,
        phone: data.phone.replace(/\D/g, ''),
        countryCode,
      };
      navigation.navigate('Endereco', { userData });
    }, 2000);


  };

  return (
    <SafeAreaView style={styles.container}>

      <Spinner
        visible={loading}
        textContent={"Carregando..."}
        textStyle={{ color: '#FFF' }}
        overlayColor="rgba(0, 0, 0, 0.6)"
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Crie sua{'\n'}conta</Text>

        {/* Nome */}
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Nome"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                autoCorrect={false}
                autoCapitalize="words"
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        {/* Idade */}
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.age && styles.inputError]}
                placeholder="Idade"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                autoCorrect={false}
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        {/* Senha */}
        <View style={styles.inputWrapper}>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }, errors.password && styles.inputError]}
                  placeholder="Senha"
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        {/* Telefone */}
        <View style={styles.inputWrapper}>
          <View style={styles.phoneContainer}>
            <TouchableOpacity style={styles.countryCode} activeOpacity={0.7}>
              <Text style={styles.flag}>{phoneEmoji}</Text>
              <Text style={styles.code}>{countryCode}</Text>
            </TouchableOpacity>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextInputMask
                  style={[styles.input, { flex: 1, marginBottom: 0 }, errors.phone && styles.inputError]}
                  placeholder="Telefone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setPhoneEmoji('😄')}
                  onBlur={() => setPhoneEmoji('😎')}
                />
              )}
            />
          </View>
          {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
        </View>

        {/* Botão de próximo */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  scrollContent: { paddingHorizontal: 30, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 38, fontWeight: '900', marginBottom: 35, color: '#0a2540', lineHeight: 44 },
  inputWrapper: { marginBottom: 20 },
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
  passwordContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 0 },
  eyeButton: { paddingHorizontal: 14, paddingVertical: 8 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 0 },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  flag: { fontSize: 22, marginRight: 10 },
  code: { fontSize: 17, color: '#222', fontWeight: '600' },
  button: {
    backgroundColor: '#0645FF',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0645FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 18,
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 19, fontWeight: '700' },
  cancelText: { textAlign: 'center', color: '#888', fontSize: 15, fontWeight: '500' },
});
