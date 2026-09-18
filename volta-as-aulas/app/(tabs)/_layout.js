import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../../styles/cores';

// Barra inferior com as quatro abas principais
export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoClaro,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="kits"
        options={{
          title: 'Kits',
          tabBarIcon: ({ color, size }) => <Ionicons name="bag-handle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="doadores"
        options={{
          title: 'Doadores',
          tabBarIcon: ({ color, size }) => <Ionicons name="gift" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="beneficiarios"
        options={{
          title: 'Famílias',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
