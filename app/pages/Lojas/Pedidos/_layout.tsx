import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2f88ff',
      }}
    >
      <Tabs.Screen
        name="Concluidos"
        options={{
          title: 'Concluídos',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Pendentes"
        options={{
          title: 'Pendentes',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="clock-o" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name='DetalhesPedido' options={{ href: null }} />
    </Tabs>
  );
};

export default Layout;
