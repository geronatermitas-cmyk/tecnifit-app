// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useIntake } from '../store/IntakeStore';

export default function SearchScreen({ route, navigation }) {
  const presetQuery = route?.params?.presetQuery ?? '';
  const [q, setQ] = useState(presetQuery);
  const { addQuery } = useIntake();

  const confirm = () => {
    const v = String(q || '').trim();
    if (!v) return;
    addQuery(v);
    Keyboard.dismiss();
    const parent = navigation.getParent?.();
    if (parent) parent.navigate('Revisión', { screen: 'Review' });
    else navigation.navigate('Review');
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:'700', marginBottom:8 }}>Describe la tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: cambiar bombilla E27 en baño"
        value={q}
        onChangeText={setQ}
        multiline
        returnKeyType="done"
        onSubmitEditing={confirm}
      />
      <TouchableOpacity style={styles.btn} onPress={confirm}>
        <Text style={styles.btnText}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor:'#64748b'}]} onPress={() => setQ('')}>
        <Text style={styles.btnText}>Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input:{ minHeight:110, backgroundColor:'#fff', borderRadius:10, padding:12, borderWidth:1, borderColor:'#E5E7EB', textAlignVertical:'top', marginBottom:10 },
  btn:{ height:44, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center', marginBottom:8 },
  btnText:{ color:'#fff', fontWeight:'800' }
});