import React, { useState } from 'react';
import { Text, ScrollView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import CampoTexto from '../../components/CampoTexto';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Regex simples de e-mail: algo@algo.algo, sem espaços
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tela de criação de conta. Ao cadastrar, o usuário já fica logado.
export default function Registro() {
  const router = useRouter();
  const { cadastrar } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erros, setErros] = useState({}); // uma mensagem por campo
  const [enviando, setEnviando] = useState(false);

  // Confere cada campo e devolve as mensagens de erro encontradas
  function validar() {
    const novosErros = {};
    if (nome.trim().length < 3) novosErros.nome = 'O nome deve ter pelo menos 3 caracteres.';
    if (!FORMATO_EMAIL.test(email.trim())) novosErros.email = 'Informe um e-mail válido.';
    if (senha.length < 6) novosErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    if (confirmacao !== senha) novosErros.confirmacao = 'As senhas não conferem.';
    return novosErros;
  }

  async function criarConta() {
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      await cadastrar({ nome, email, senha });
    } catch (e) {
      // Único erro possível aqui: e-mail já cadastrado
      setErros({ email: e.message });
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      <KeyboardAvoidingView behavior="padding" style={estilos.container}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
          <CampoTexto label="Nome" value={nome} onChangeText={setNome} placeholder="Ex.: Ana Lima" erro={erros.nome} />
          <CampoTexto
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            erro={erros.email}
          />
          <CampoTexto
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
            erro={erros.senha}
          />
          <CampoTexto
            label="Confirmar senha"
            value={confirmacao}
            onChangeText={setConfirmacao}
            placeholder="Repita a senha"
            secureTextEntry
            autoCapitalize="none"
            erro={erros.confirmacao}
          />

          {enviando ? (
            <ActivityIndicator size="large" color={cores.primaria} />
          ) : (
            <Botao titulo="Criar conta" onPress={criarConta} />
          )}

          <TouchableOpacity onPress={() => router.back()} disabled={enviando}>
            <Text style={estilos.link}>Já tenho conta. Entrar</Text>
          </TouchableOpacity>
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
  link: {
    color: cores.primaria,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
