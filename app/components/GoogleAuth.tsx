import React from 'react';
import { Pressable, Text, Image, StyleSheet, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession(); // Necessário para finalizar sessões

const GoogleAuth = () => {
  return (
    <Pressable style={styles.botao}>
      <Image
        source={require('../../assets/images/google.png')}
        style={{ width: 24, height: 24 }}
      />
      <Text style={styles.texto}>Entrar com Google</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: "85%",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2f88ff",
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GoogleAuth;
