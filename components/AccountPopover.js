// components/AccountPopover.js
// @ts-nocheck
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

export default function AccountPopover({ visible, onClose, options = [] }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* fondo */}
      <Pressable style={styles.backdrop} onPress={onClose} />
      {/* tarjeta cerca arriba-derecha */}
      <View style={styles.card}>
        {options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.item} onPress={() => { onClose?.(); opt.onPress?.(); }}>
            <Text style={styles.itemText}>{opt.icon ? `${opt.icon}  ` : ''}{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  card: {
    position: 'absolute',
    top: 60, right: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    minWidth: 220,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10
  },
  item: { paddingVertical: 12, paddingHorizontal: 14 },
  itemText: { fontWeight: '700', color: '#0f172a' },
});