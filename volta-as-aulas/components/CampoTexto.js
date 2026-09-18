import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

// Campo de formulário: rótulo + TextInput, configurado por props
export default function CampoTexto({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>{label}</Text>
      <TextInput
        style={estilos.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={cores.textoClaro}
        keyboardType={keyboardType || 'default'}
      />
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
  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: cores.texto,
  },
});
