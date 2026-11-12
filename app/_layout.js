import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DadosProvider, useDados } from '../context/DadosContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { cores } from '../styles/cores';

// Rotas do app: mostra o "carregando" até o AsyncStorage responder
function Rotas() {
  const { carregando } = useDados();
  const { usuarioLogado, carregando: carregandoAuth } = useAuth();
  const logado = !!usuarioLogado;

  if (carregando || carregandoAuth) {
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
      {/* Telas internas: só existem com usuário logado.
          Sem sessão, o Stack pula para a primeira tela liberada (o login). */}
      <Stack.Protected guard={logado}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro/kit" options={{ title: 'Novo kit' }} />
        <Stack.Screen name="cadastro/doador" options={{ title: 'Novo doador' }} />
        <Stack.Screen name="cadastro/beneficiario" options={{ title: 'Nova família' }} />
        <Stack.Screen name="entrega/[id]" options={{ title: 'Registrar entrega' }} />
      </Stack.Protected>

      {/* Telas de login/registro: só aparecem para quem NÃO está logado */}
      <Stack.Protected guard={!logado}>
        <Stack.Screen name="(auth)/login" options={{ title: 'Entrar' }} />
        <Stack.Screen name="(auth)/registro" options={{ title: 'Criar conta' }} />
      </Stack.Protected>
    </Stack>
  );
}

// Layout raiz: AuthProvider por fora (sessão) e DadosProvider por dentro (kits, famílias...)
export default function LayoutRaiz() {
  return (
    <AuthProvider>
      <DadosProvider>
        <StatusBar style="light" />
        <Rotas />
      </DadosProvider>
    </AuthProvider>
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
