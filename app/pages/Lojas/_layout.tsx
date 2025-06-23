import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Foundation from '@expo/vector-icons/Foundation'

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2f88ff',
      }}
    >
      <Tabs.Screen
        name='HomeLojas'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={28} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='Pedidos'
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <Foundation size={28} name='clipboard-notes' color={color} />,
        }}
      />
      <Tabs.Screen
        name='ConfiguracoesLoja'
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name='gear' color={color} />,
        }}
      />
      {/* Telas ocultas da tab bar */}
      <Tabs.Screen name='EditarDadosLoja' options={{ href: null }} />
      <Tabs.Screen name='ProdutosLoja' options={{ href: null }} />
      {/* <Tabs.Screen name='LinkToPedidos' options={{ href: null }} /> */}
      <Tabs.Screen name='Estoque' options={{ href: null }} />
      <Tabs.Screen name='AdicionarProduto' options={{ href: null }} />
    </Tabs>
  )
}

export default Layout
