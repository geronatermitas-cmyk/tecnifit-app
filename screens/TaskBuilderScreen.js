// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function TaskBuilderScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Diseñar proceso</Text>
      <Text style={styles.p}>
        Aquí generaremos un proceso guiado a partir de lo que tengas en el Panel de control
        (búsquedas, códigos, fotos). En esta fase es un prototipo visual.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Prototipo', 'Guardado simulado.')}>
        <Text style={styles.btnTxt}>Guardar borrador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16, gap: 12 },
  h1: { fontWeight: '900', fontSize: 22 },
  p: { color: '#334155' },
  btn: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnTxt: { color: '#fff', fontWeight: '800' },
});