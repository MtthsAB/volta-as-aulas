import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DadosProvider, useDados } from '../context/DadosContext';
import { cores } from '../styles/cores';

// Rotas do app: mostra o "carregando" até o AsyncStorage responder
function Rotas() {
  const { carregando } = useDados();

  if (carregando) {
    return (
      <View style={estilos.carregando}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.branco,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro/kit" options={{ title: 'Novo kit' }} />
      <Stack.Screen name="cadastro/doador" options={{ title: 'Novo doador' }} />
      <Stack.Screen name="cadastro/beneficiario" options={{ title: 'Nova família' }} />
      <Stack.Screen name="entrega/[id]" options={{ title: 'Registrar entrega' }} />
    </Stack>
  );
}

// Layout raiz: envolve tudo no Provider para todas as telas usarem os dados
export default function LayoutRaiz() {
  return (
    <DadosProvider>
      <StatusBar style="light" />
      <Rotas />
    </DadosProvider>
  );
}

const estilos = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
  },
});
