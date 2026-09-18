import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import Card from '../../components/Card';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Tela de entrega: escolhe um kit para a família informada na rota
export default function Entrega() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // id vem da URL /entrega/[id]
  const { kits, beneficiarios, registrarEntrega } = useDados();
  // Kit escolhido, aguardando confirmação no Modal
  const [kitEscolhido, setKitEscolhido] = useState(null);

  const familia = beneficiarios.find((b) => b.id === id);

  // Proteção caso a família tenha sido excluída
  if (!familia) {
    return (
      <SafeAreaView style={estilos.container} edges={['bottom']}>
        <Text style={estilos.vazio}>Família não encontrada.</Text>
      </SafeAreaView>
    );
  }

  // Só aparecem kits do mesmo nível e com estoque
  const kitsDisponiveis = kits.filter(
    (kit) => kit.nivel === familia.nivel && kit.quantidade > 0
  );

  function confirmarEntrega() {
    registrarEntrega(familia.id, kitEscolhido.id);
    setKitEscolhido(null);
    router.back();
  }

  function renderizarKit({ item }) {
    return (
      <TouchableOpacity onPress={() => setKitEscolhido(item)}>
        <Card>
          <Text style={estilos.nomeKit}>{item.nome}</Text>
          <Text style={estilos.detalhe}>Itens: {item.itens}</Text>
          <Text style={estilos.detalhe}>Disponíveis: {item.quantidade}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container} edges={['bottom']}>
      <FlatList
        data={kitsDisponiveis}
        keyExtractor={(item) => item.id}
        renderItem={renderizarKit}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={
          <View>
            {/* Dados da família que vai receber o kit */}
            <Card style={estilos.cardFamilia}>
              <Text style={estilos.nomeFamilia}>{familia.estudante}</Text>
              <Text style={estilos.detalhe}>Responsável: {familia.responsavel}</Text>
              <Text style={estilos.detalhe}>Escola: {familia.escola}</Text>
              <Text style={estilos.detalhe}>Nível: {familia.nivel}</Text>
            </Card>
            <Text style={estilos.subtitulo}>Escolha um kit</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhum kit disponível para este nível</Text>
        }
      />

      {/* Modal de confirmação da entrega */}
      <Modal visible={kitEscolhido !== null} transparent animationType="fade">
        <View style={estilos.fundoModal}>
          <View style={estilos.caixaModal}>
            <Text style={estilos.tituloModal}>Confirmar entrega?</Text>
            <Text style={estilos.textoModal}>
              Entregar {kitEscolhido ? kitEscolhido.nome : ''} para {familia.estudante}.
            </Text>
            <View style={estilos.botoesModal}>
              <Botao titulo="Cancelar" cor={cores.textoClaro} onPress={() => setKitEscolhido(null)} />
              <Botao titulo="Confirmar" cor={cores.verde} onPress={confirmarEntrega} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  lista: {
    padding: 16,
  },
  cardFamilia: {
    borderLeftWidth: 4,
    borderLeftColor: cores.destaque,
  },
  nomeFamilia: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.primaria,
    marginTop: 8,
    marginBottom: 12,
  },
  nomeKit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: cores.textoClaro,
    marginBottom: 2,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textoClaro,
    marginTop: 24,
    fontSize: 16,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 32,
  },
  caixaModal: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 20,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 8,
  },
  textoModal: {
    fontSize: 15,
    color: cores.textoClaro,
    marginBottom: 20,
  },
  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
