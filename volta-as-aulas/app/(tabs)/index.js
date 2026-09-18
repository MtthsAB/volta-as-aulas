import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDados } from '../../context/DadosContext';
import Indicador from '../../components/Indicador';
import { cores } from '../../styles/cores';

// Painel inicial: resume os números do projeto
export default function Painel() {
  const { kits, doadores, beneficiarios } = useDados();

  // Cálculos feitos a partir das listas do Context
  const kitsEmEstoque = kits.reduce((total, kit) => total + kit.quantidade, 0);
  const familiasAguardando = beneficiarios.filter((b) => !b.atendido).length;
  const familiasAtendidas = beneficiarios.filter((b) => b.atendido).length;

  return (
    <SafeAreaView style={estilos.container} edges={['top']}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.titulo}>Volta às Aulas Solidária</Text>

        {/* Grade de indicadores: duas colunas com flexWrap */}
        <View style={estilos.grade}>
          <Indicador titulo="Kits em estoque" valor={kitsEmEstoque} icone="bag-handle" />
          <Indicador titulo="Famílias aguardando" valor={familiasAguardando} icone="hourglass" />
          <Indicador titulo="Famílias atendidas" valor={familiasAtendidas} icone="checkmark-circle" />
          <Indicador titulo="Doadores cadastrados" valor={doadores.length} icone="gift" />
        </View>

        <Text style={estilos.descricao}>
          Este app organiza a campanha de material escolar: doadores enviam kits, as famílias
          se cadastram e a equipe registra cada entrega, garantindo que nenhum estudante
          comece o ano sem material.
        </Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 16,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  descricao: {
    fontSize: 15,
    color: cores.texto,
    lineHeight: 22,
    marginTop: 8,
  },
});
