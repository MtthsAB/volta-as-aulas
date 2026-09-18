import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

// Os quatro níveis de ensino aceitos pelo app
export const NIVEIS = ['Educação Infantil', 'Fundamental I', 'Fundamental II', 'Ensino Médio'];

// Quatro botões lado a lado; o selecionado fica destacado
export default function SeletorNivel({ valor, aoSelecionar }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>Nível de ensino</Text>
      <View style={estilos.linha}>
        {NIVEIS.map((nivel) => {
          const selecionado = nivel === valor;
          return (
            <TouchableOpacity
              key={nivel}
              style={[estilos.opcao, selecionado && estilos.opcaoSelecionada]}
              onPress={() => aoSelecionar(nivel)}
            >
              <Text style={[estilos.textoOpcao, selecionado && estilos.textoSelecionado]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 6,
  },
  linha: {
    flexDirection: 'row',
  },
  opcao: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcaoSelecionada: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  textoOpcao: {
    fontSize: 12,
    color: cores.texto,
    textAlign: 'center',
  },
  textoSelecionado: {
    color: cores.branco,
    fontWeight: 'bold',
  },
});
