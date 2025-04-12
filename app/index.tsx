import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export const options = {
  headerShown: false,
};

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 18,
        marginTop: 35
      }}>
        Seja bem-vindo(a) ao FarmaFácil!
      </Text>

      <View style={styles.containerButtons}>
        <Text style={{ fontSize: 22, marginBottom: 20, fontWeight: 'bold' }} >Quem é você?</Text>

        <TouchableOpacity
          onPress={() => router.push('/auth/cliente/loginCliente')}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Sou um cliente</Text>
          <AntDesign name="user" size={22} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/loja/loginLoja')}
          style={[styles.button]}
        >
          <Text style={{ fontSize: 18 }}>Sou uma loja</Text>
          <FontAwesome5 name="store-alt" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButtons: {
    marginTop: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: '#2f88ff',
    borderRadius: 8,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 15
  },
  secondaryButton: {
    backgroundColor: '#2f88ff',
    color: '#fff'
  },
  primaryText: {
    fontSize: 22,
    padding: 18,
    textAlign: 'center'
  },
  secondaryText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 25
  },
  buttonCliente: {
    width: 230,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    fontSize: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2f88ff",
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2f88ff',
  },
  buttonLoja: {
    width: 230,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2f88ff",
    display: 'flex',
    flexDirection: 'row'
  }
})