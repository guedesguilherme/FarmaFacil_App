import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Layout = () => {
  return (
    <React.Fragment>
        <Tabs screenOptions={{ headerShown: false, tabBarActiveIndicator: '#2f88ff' }}>
            <Tabs.Screen 
                name='HomeLojas'
                options={{      
                    title: 'Home',
                    tabBarIcon: ({color}) => <Entypo size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen 
                name='PedidosLoja'
                options={{        
                    title: 'Pedidos',
                    tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="store" color={color} />,
                }}
            />
            <Tabs.Screen 
                name='ConfiguracoesLoja'
                options={{                    
                    title: 'Configurações',
                    tabBarIcon: ({color}) => <FontAwesome6 size={28} name="gear" color={color} />,
                }}
            />
            <Tabs.Screen 
                name='EditarDadosLoja'
                options={{                    
                    href:null,
                    tabBarIcon: ({color}) => <FontAwesome6 size={28} name="gear" color={color} />,
                }}
            />
        </Tabs>
    </React.Fragment>
  )
}

export default Layout

const styles = StyleSheet.create({})