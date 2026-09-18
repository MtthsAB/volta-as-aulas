import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../styles/cores';

// Componente de CLASSE (conteúdo de aula): mostra um número do painel
// Lê as props com this.props e desenha a tela no método render()
export default class Indicador extends React.Component {
  render() {
    const { titulo, valor, icone } = this.props;
    return (
      <View style={estilos.card}>
        <Ionicons name={icone} size={28} color={cores.primaria} />
        <Text style={estilos.valor}>{valor}</Text>
        <Text style={estilos.titulo}>{titulo}</Text>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  valor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 6,
  },
  titulo: {
    fontSize: 13,
    color: cores.textoClaro,
    textAlign: 'center',
    marginTop: 2,
  },
});
