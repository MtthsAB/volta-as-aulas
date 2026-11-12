import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import Card from '../../components/Card';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Lista de famílias cadastradas
export default function Beneficiarios() {
  const router = useRouter();
  const { beneficiarios, removerBeneficiario } = useDados();
  // Família escolhida com toque longo, aguardando confirmação de exclusão
  const [familiaParaExcluir, setFamiliaParaExcluir] = useState(null);

  function confirmarExclusao() {
    removerBeneficiario(familiaParaExcluir.id);
    setFamiliaParaExcluir(null);
  }

  // Toque simples: só famílias aguardando vão para a tela de entrega
  function abrirEntrega(familia) {
    if (!familia.atendido) {
      router.push('/entrega/' + familia.id);
    }
  }

  // Desenha um cartão para cada família
  function renderizarFamilia({ item }) {
    return (
      <TouchableOpacity
        onPress={() => abrirEntrega(item)}
        onLongPress={() => setFamiliaParaExcluir(item)}
      >
        <Card>
          <View style={estilos.linhaNome}>
            <Text style={estilos.nome}>{item.estudante}</Text>
            <Text style={[estilos.status, item.atendido ? estilos.atendida : estilos.aguardando]}>
              {item.atendido ? 'Atendida' : 'Aguardando'}
            </Text>
          </View>
          <Text style={estilos.detalhe}>Responsável: {item.responsavel}</Text>
          <Text style={estilos.detalhe}>Nível: {item.nivel}</Text>
          <Text style={estilos.detalhe}>Escola: {item.escola}</Text>
          {!item.atendido && <Text style={estilos.dica}>Toque para registrar entrega</Text>}
          {/* Entregas antigas não têm entreguePor; nesse caso nada é mostrado */}
          {item.atendido && item.entreguePor ? (
            <Text style={estilos.dica}>Registrado por {item.entreguePor}</Text>
          ) : null}
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container} edges={['top']}>
      <View style={estilos.topo}>
        <Text style={estilos.titulo}>Famílias</Text>
        <Botao titulo="Novo" onPress={() => router.push('/cadastro/beneficiario')} />
      </View>

      <FlatList
        data={beneficiarios}
        keyExtractor={(item) => item.id}
        renderItem={renderizarFamilia}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma família cadastrada. Toque em Novo para adicionar.</Text>}
      />

      {/* Modal de confirmação aberto pelo toque longo */}
      <Modal visible={familiaParaExcluir !== null} transparent animationType="fade">
        <View style={estilos.fundoModal}>
          <View style={estilos.caixaModal}>
            <Text style={estilos.tituloModal}>Excluir família?</Text>
            <Text style={estilos.textoModal}>
              O cadastro de {familiaParaExcluir ? familiaParaExcluir.estudante : ''} será removido.
            </Text>
            <View style={estilos.botoesModal}>
              <Botao titulo="Cancelar" cor={cores.textoClaro} onPress={() => setFamiliaParaExcluir(null)} />
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
  linhaNome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    color: cores.branco,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  aguardando: {
    backgroundColor: cores.destaque,
    color: cores.texto,
  },
  atendida: {
    backgroundColor: cores.verde,
  },
  detalhe: {
    fontSize: 14,
    color: cores.textoClaro,
    marginBottom: 2,
  },
  dica: {
    fontSize: 12,
    color: cores.primaria,
    marginTop: 6,
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
