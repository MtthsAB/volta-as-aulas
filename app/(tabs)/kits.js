import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import Card from '../../components/Card';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Lista de kits cadastrados
export default function Kits() {
  const router = useRouter();
  const { kits, removerKit } = useDados();
  // Kit escolhido com toque longo, aguardando confirmação de exclusão
  const [kitParaExcluir, setKitParaExcluir] = useState(null);

  function confirmarExclusao() {
    removerKit(kitParaExcluir.id);
    setKitParaExcluir(null);
  }

  // Desenha um cartão para cada kit da lista
  function renderizarKit({ item }) {
    const semEstoque = item.quantidade === 0;
    return (
      <TouchableOpacity onLongPress={() => setKitParaExcluir(item)}>
        <Card>
          <Text style={estilos.nome}>{item.nome}</Text>
          <Text style={estilos.detalhe}>Nível: {item.nivel}</Text>
          <Text style={estilos.detalhe}>Itens: {item.itens}</Text>
          <Text style={[estilos.quantidade, semEstoque && estilos.semEstoque]}>
            Quantidade: {item.quantidade}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container} edges={['top']}>
      <View style={estilos.topo}>
        <Text style={estilos.titulo}>Kits</Text>
        <Botao titulo="Novo" onPress={() => router.push('/cadastro/kit')} />
      </View>

      <FlatList
        data={kits}
        keyExtractor={(item) => item.id}
        renderItem={renderizarKit}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum kit cadastrado.</Text>}
      />

      {/* Modal de confirmação aberto pelo toque longo */}
      <Modal visible={kitParaExcluir !== null} transparent animationType="fade">
        <View style={estilos.fundoModal}>
          <View style={estilos.caixaModal}>
            <Text style={estilos.tituloModal}>Excluir kit?</Text>
            <Text style={estilos.textoModal}>
              {kitParaExcluir ? kitParaExcluir.nome : ''} será removido da lista.
            </Text>
            <View style={estilos.botoesModal}>
              <Botao titulo="Cancelar" cor={cores.textoClaro} onPress={() => setKitParaExcluir(null)} />
              <Botao titulo="Excluir" cor={cores.vermelho} onPress={confirmarExclusao} />
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
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: cores.textoClaro,
    marginBottom: 2,
  },
  quantidade: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 4,
  },
  semEstoque: {
    color: cores.vermelho,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textoClaro,
    marginTop: 40,
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
