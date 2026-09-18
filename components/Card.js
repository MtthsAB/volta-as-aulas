import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

// Cartão genérico: recebe qualquer conteúdo via children
export default function Card({ children, style }) {
  return <View style={[estilos.card, style]}>{children}</View>;
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
});
