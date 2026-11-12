import React, { useState } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import CampoTexto from '../../components/CampoTexto';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Tela de login. Ao entrar, o Stack.Protected do _layout troca para as abas sozinho.
export default function Login() {
  const router = useRouter();
  const { entrar } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false); // evita toque duplo

  async function fazerLogin() {
    if (!email.trim() || !senha) {
      setErro('Preencha e-mail e senha.');
      return;
    }
    setErro('');
    setEnviando(true);
    try {
      await entrar(email, senha);
    } catch (e) {
      setErro(e.message);
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      {/* KeyboardAvoidingView + ScrollView: o teclado não cobre os campos */}
      <KeyboardAvoidingView behavior="padding" style={estilos.container}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
          <Text style={estilos.titulo}>Volta às Aulas Solidária</Text>
          <Text style={estilos.subtitulo}>Entre para gerenciar kits, doadores e famílias.</Text>

          <CampoTexto
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <CampoTexto
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
            autoCapitalize="none"
            erro={erro}
          />

          {/* Enquanto confere a senha, mostra o indicador no lugar do botão */}
          {enviando ? (
            <ActivityIndicator size="large" color={cores.primaria} />
          ) : (
            <Botao titulo="Entrar" onPress={fazerLogin} />
          )}

          <TouchableOpacity onPress={() => router.push('/registro')} disabled={enviando}>
            <Text style={estilos.link}>Não tem conta? Criar conta</Text>
          </TouchableOpacity>

          <Text style={estilos.demo}>
            Usuário de demonstração:{'\n'}demo@voltaasaulas.com / 123456
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 15,
    color: cores.textoClaro,
    marginBottom: 20,
  },
  link: {
    color: cores.primaria,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  demo: {
    color: cores.textoClaro,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 32,
  },
});
