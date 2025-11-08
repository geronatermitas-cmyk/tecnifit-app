// @ts-nocheck

import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { usePlan } from '../store/PlanStore';

export default function PlansModal({ visible, onClose }) {
  const { currentPlan, selectPlan, plans } = usePlan();

  const handleSelectPlan = async (planId) => {
    await selectPlan(planId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Modal desde abajo */}
      <View style={styles.container}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Planes de Suscripción</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Contenido */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.subtitle}>Plan actual: <Text style={styles.badge}>{(currentPlan || 'free').toUpperCase()}</Text></Text>
            
            {plans.map((p) => (
              <View key={p.id} style={[styles.card, currentPlan === p.id && styles.cardActive]}>
                <Text style={styles.cardTitle}>{p.name}</Text>
                <Text style={styles.price}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>€{p.price}</Text>/mes
                </Text>
                
                <View style={{ marginTop: 12 }}>
                  {p.benefits.map((b, i) => (
                    <Text key={i} style={styles.benefit}>✓ {b}</Text>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.btn, currentPlan === p.id ? styles.btnGhost : styles.btnPrimary]}
                  onPress={() => (currentPlan === p.id ? null : handleSelectPlan(p.id))}
                  disabled={currentPlan === p.id}
                >
                  <Text style={[styles.btnText, currentPlan === p.id && styles.btnGhostText]}>
                    {currentPlan === p.id ? 'Plan Actual' : 'Seleccionar'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 20,
    color: '#64748B',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    color: '#1D4ED8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  cardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  price: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 8,
  },
  benefit: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },
  btn: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#2563EB',
  },
  btnGhost: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  btnGhostText: {
    color: '#0F172A',
  },
});
