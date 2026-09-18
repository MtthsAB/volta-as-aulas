import React, { useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import CampoTexto from '../../components/CampoTexto';
import SeletorNivel from '../../components/SeletorNivel';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Formulário de cadastro de família (beneficiário)
// Por respeito à privacidade, não pedimos CPF, endereço nem data de nascimento
export default function CadastroBeneficiario() {
  const router = useRouter();
  const { adicionarBeneficiario } = useDados();

  // Um estado para cada campo do formulário
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estudante, setEstudante] = useState('');
  const [escola, setEscola] = useState('');
  const [nivel, setNivel] = useState('');

  function salvar() {
    // Validação: todos os campos são obrigatórios
    if (!responsavel.trim() || !telefone.trim() || !estudante.trim() || !escola.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (!nivel) {
      Alert.alert('Atenção', 'Selecione o nível de ensino.');
      return;
    }

    adicionarBeneficiario({
      responsavel: responsavel.trim(),
      telefone: telefone.trim(),
      estudante: estudante.trim(),
      escola: escola.trim(),
      nivel: nivel,
    });
    Alert.alert('Sucesso', 'Família cadastrada!');
    router.back();
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <CampoTexto label="Nome do responsável" value={responsavel} onChangeText={setResponsavel} placeholder="Ex.: Ana Lima" />
        <CampoTexto label="Telefone" value={telefone} onChangeText={setTelefone} placeholder="Ex.: 54999990000" keyboardType="phone-pad" />
        <CampoTexto label="Nome do estudante" value={estudante} onChangeText={setEstudante} placeholder="Ex.: Pedro Lima" />
        <CampoTexto label="Escola" value={escola} onChangeText={setEscola} placeholder="Ex.: EMEF São José" />
        <SeletorNivel valor={nivel} aoSelecionar={setNivel} />
        <Botao titulo="Salvar" onPress={salvar} />
      </ScrollView>
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
