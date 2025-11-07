import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActionBar({ onSearch, onAskLogin, onGoPlans, canUsePhotos = false, canUseCodes = false, isLogged = false }) {
  const [bubble, setBubble] = useState(null);
  const showLocked = (what) => {
    const title = `${what} no disponible`;
    const desc = isLogged ? 'Función no disponible en tu plan actual.' : 'Inicia sesión para usar esta función.';
    setBubble({ title, desc });
  };
  const closeBubble = () => setBubble(null);
  return (
    <View>
      <View style={styles.wrap}>
        <Btn label="Buscar" onPress={onSearch} ghost={false} />
        <Btn label="Fotos" ghost onPress={() => (canUsePhotos ? onSearch?.() : showLocked('Fotos'))} />
        <Btn label="Códigos" ghost onPress={() => (canUseCodes ? onSearch?.() : showLocked('Códigos'))} />
      </View>
    </View>
  );
}

function Btn({ label, onPress, ghost }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, ghost && styles.btnGhost]}>
      <Text style={[styles.btnText, ghost && styles.btnGhostText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', gap: 8, padding: 12 },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: '#2563EB' },
  btnGhost: { backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E2E2E2' },
  btnText: { color: '#fff', fontWeight: '600' },
  btnGhostText: { color: '#333' },
});
