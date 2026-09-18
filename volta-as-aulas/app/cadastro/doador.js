import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import CampoTexto from '../../components/CampoTexto';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Formulário de cadastro de doador
export default function CadastroDoador() {
  const router = useRouter();
  const { adicionarDoador } = useDados();

  // Um estado para cada campo do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [pessoaJuridica, setPessoaJuridica] = useState(false);

  function salvar() {
    // Validação: nome e telefone são obrigatórios
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Preencha nome e telefone.');
      return;
    }

    adicionarDoador({
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      pessoaJuridica: pessoaJuridica,
    });
    Alert.alert('Sucesso', 'Doador cadastrado!');
    router.back();
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <CampoTexto label="Nome" value={nome} onChangeText={setNome} placeholder="Nome ou razão social" />
        <CampoTexto label="Telefone" value={telefone} onChangeText={setTelefone} placeholder="Ex.: 54999990000" keyboardType="phone-pad" />
        <CampoTexto label="E-mail (opcional)" value={email} onChangeText={setEmail} placeholder="contato@email.com" keyboardType="email-address" />

        {/* Switch liga/desliga o selo de empresa */}
        <View style={estilos.linhaSwitch}>
          <Text style={estilos.labelSwitch}>É empresa (pessoa jurídica)?</Text>
          <Switch
            value={pessoaJuridica}
            onValueChange={setPessoaJuridica}
            trackColor={{ false: cores.borda, true: cores.primaria }}
          />
        </View>

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
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelSwitch: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.texto,
  },
});
