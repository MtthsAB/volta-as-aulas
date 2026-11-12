import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import CampoTexto from '../../components/CampoTexto';
import SeletorNivel from '../../components/SeletorNivel';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Formulário de cadastro de kit
export default function CadastroKit() {
  const router = useRouter();
  const { adicionarKit } = useDados();

  // Um estado para cada campo do formulário
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState('');
  const [itens, setItens] = useState('');
  const [quantidade, setQuantidade] = useState('');

  function salvar() {
    // Validação: obrigatórios preenchidos e quantidade inteira maior que zero
    if (!nome.trim() || !itens.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha nome, itens e quantidade.');
      return;
    }
    if (!nivel) {
      Alert.alert('Atenção', 'Selecione o nível de ensino.');
      return;
    }
    const quantidadeNumero = Number(quantidade);
    if (!Number.isInteger(quantidadeNumero) || quantidadeNumero <= 0) {
      Alert.alert('Atenção', 'A quantidade deve ser um número inteiro maior que zero.');
      return;
    }

    adicionarKit({
      nome: nome.trim(),
      nivel: nivel,
      itens: itens.trim(),
      quantidade: quantidadeNumero,
    });
    Alert.alert('Sucesso', 'Kit cadastrado!');
    router.back();
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      {/* KeyboardAvoidingView: o teclado empurra o formulário em vez de cobrir os campos */}
      <KeyboardAvoidingView behavior="padding" style={estilos.container}>
        <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
          <CampoTexto label="Nome do kit" value={nome} onChangeText={setNome} placeholder="Ex.: Kit Fundamental" />
          <SeletorNivel valor={nivel} aoSelecionar={setNivel} />
          <CampoTexto label="Itens" value={itens} onChangeText={setItens} placeholder="Ex.: caderno, lápis, borracha, mochila" />
          <CampoTexto label="Quantidade" value={quantidade} onChangeText={setQuantidade} placeholder="Ex.: 5" keyboardType="numeric" />
          <Botao titulo="Salvar" onPress={salvar} />
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
});
