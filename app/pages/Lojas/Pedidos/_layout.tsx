import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Layout = () => {
  return (
    <React.Fragment>
        <Tabs screenOptions={{ headerShown: false, tabBarActiveIndicator: '#2f88ff' }}>
            <Tabs.Screen 
                name='Concluidos'
                options={{
                    title: 'Concluídos',
                    tabBarIcon: ({color}) => <FontAwesome name='check-square' size={28} color={color} />,
                }}
            />
            <Tabs.Screen 
                name='Pendentes'
                options={{
                    title: 'Pendentes',
                    tabBarIcon: ({color}) => <FontAwesome name='clock-o' size={28} color={color} />
                }}
            />
        </Tabs>
    </React.Fragment>
  )
}

export default Layout