import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

// Botão padrão do app; a cor de fundo pode ser trocada via prop
export default function Botao({ titulo, onPress, cor }) {
  return (
    <TouchableOpacity
      style={[estilos.botao, { backgroundColor: cor || cores.primaria }]}
      onPress={onPress}
    >
      <Text style={estilos.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  texto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
