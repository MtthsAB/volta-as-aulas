import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDados } from '../../context/DadosContext';
import Card from '../../components/Card';
import Botao from '../../components/Botao';
import { cores } from '../../styles/cores';

// Lista de doadores cadastrados
export default function Doadores() {
  const router = useRouter();
  const { doadores, removerDoador } = useDados();
  // Doador escolhido com toque longo, aguardando confirmação de exclusão
  const [doadorParaExcluir, setDoadorParaExcluir] = useState(null);

  function confirmarExclusao() {
    removerDoador(doadorParaExcluir.id);
    setDoadorParaExcluir(null);
  }

  // Desenha um cartão para cada doador
  function renderizarDoador({ item }) {
    return (
      <TouchableOpacity onLongPress={() => setDoadorParaExcluir(item)}>
        <Card>
          <View style={estilos.linhaNome}>
            <Text style={estilos.nome}>{item.nome}</Text>
            {/* Selo mostrado apenas quando o doador é pessoa jurídica */}
            {item.pessoaJuridica && (
              <View style={estilos.selo}>
                <Text style={estilos.textoSelo}>Empresa</Text>
              </View>
            )}
          </View>
          <Text style={estilos.detalhe}>Telefone: {item.telefone}</Text>
          {item.email ? <Text style={estilos.detalhe}>E-mail: {item.email}</Text> : null}
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container} edges={['top']}>
      <View style={estilos.topo}>
        <Text style={estilos.titulo}>Doadores</Text>
        <Botao titulo="Novo" onPress={() => router.push('/cadastro/doador')} />
      </View>

      <FlatList
        data={doadores}
        keyExtractor={(item) => item.id}
        renderItem={renderizarDoador}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum doador cadastrado. Toque em Novo para adicionar.</Text>}
      />

      {/* Modal de confirmação aberto pelo toque longo */}
      <Modal visible={doadorParaExcluir !== null} transparent animationType="fade">
        <View style={estilos.fundoModal}>
          <View style={estilos.caixaModal}>
            <Text style={estilos.tituloModal}>Excluir doador?</Text>
            <Text style={estilos.textoModal}>
              {doadorParaExcluir ? doadorParaExcluir.nome : ''} será removido da lista.
            </Text>
            <View style={estilos.botoesModal}>
              <Botao titulo="Cancelar" cor={cores.textoClaro} onPress={() => setDoadorParaExcluir(null)} />
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
  selo: {
    backgroundColor: cores.destaque,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  textoSelo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: cores.texto,
  },
  detalhe: {
    fontSize: 14,
    color: cores.textoClaro,
    marginBottom: 2,
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
