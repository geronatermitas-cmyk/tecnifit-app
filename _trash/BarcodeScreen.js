// screens/BarcodeScreen.js
// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useIntake } from '../store/IntakeStore';

export default function BarcodeScreen({ navigation }) {
  const { state, addCodes, removeCode } = useIntake();
  const [manual, setManual] = useState('');

  const tryScan = () => {
    Alert.alert(
      'Escáner no disponible',
      'Tu cliente actual no incluye el módulo de escáner. Usa la cámara o sube una foto del código, o añade el código manualmente.'
    );
  };

  const addManual = () => {
    const value = manual.trim();
    if (!value) return;
    addCodes([value]);
    setManual('');
  };

  const codes = state.codes || [];
  const hasCodes = codes.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Códigos (barras/QR)</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={tryScan}>
          <Text style={styles.btnText}>Escanear código</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Añadir manualmente</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Introduce el código (EAN/QR/serial)"
          value={manual}
          onChangeText={setManual}
          returnKeyType="done"
          onSubmitEditing={addManual}
          blurOnSubmit
        />
        <TouchableOpacity style={[styles.btn, { minWidth: 110 }]} onPress={addManual}>
          <Text style={styles.btnText}>Añadir código</Text>
        </TouchableOpacity>
      </View>

      {hasCodes && (
        <>
          <Text style={styles.sectionHint}>Códigos añadidos</Text>
          <FlatList
            data={codes}
            keyExtractor={(code, idx) => `${code}-${idx}`}
            contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
            renderItem={({ item }) => (
              <View style={styles.codeItem}>
                <Text style={styles.codeText}>{item}</Text>
                <Text style={styles.removeCode} onPress={() => removeCode(item)}>Eliminar</Text>
              </View>
            )}
          />
        </>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.btnUnified, { backgroundColor:'#6B7280' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnUnifiedText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnUnified, { opacity: hasCodes ? 1 : 0.5 }]}
          disabled={!hasCodes}
          onPress={() => navigation.navigate('Review')}
        >
          <Text style={styles.btnUnifiedText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F5F6F7', padding:16, paddingTop:20 },
  h1:{ fontSize:18, fontWeight:'700', textAlign:'center', marginBottom:12, color:'#1E293B' },
  row:{ flexDirection:'row', gap:10, marginBottom:12, alignItems:'center' },
  btn:{ height:46, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center', paddingHorizontal:16 },
  btnText:{ color:'#fff', fontWeight:'700' },
  input:{ flex:1, height:46, backgroundColor:'#fff', borderRadius:10, paddingHorizontal:12, borderWidth:1, borderColor:'#E5E7EB', fontSize:15 },
  sectionTitle:{ marginTop:8, fontSize:15, fontWeight:'700', color:'#1E293B' },
  sectionHint:{ marginTop:6, fontSize:13, color:'#475569' },
  codeItem:{ backgroundColor:'#fff', padding:10, borderRadius:8, flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  codeText:{ color:'#111827', fontWeight:'600' },
  removeCode:{ color:'#EF4444', fontWeight:'700' },
  bottomBar:{ position:'absolute', left:0, right:0, bottom:0, padding:12, flexDirection:'row', gap:10, backgroundColor:'rgba(245,246,247,0.96)', borderTopWidth:1, borderTopColor:'#E5E7EB' },
  btnUnified:{ flex:1, height:46, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center' },
  btnUnifiedText:{ color:'#fff', fontWeight:'700' },
});