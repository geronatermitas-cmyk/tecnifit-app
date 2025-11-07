import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import { usePlan } from '../store/PlanStore';

export default function PlansScreen() {
  const nav = useNavigation();
  const { user } = useAuth();
  const { currentPlan, selectPlan, plans } = usePlan();

  useEffect(() => {
    if (!user) nav.replace('Login', { next: { name: 'Plans' } });
  }, [user]);

  if (!user) return null;

  const goCheckout = (planId) => {
    nav.navigate('Checkout', { planId });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.h1}>Elige tu plan</Text>
      <Text style={styles.sub}>Plan actual: <Text style={styles.badge}>{(currentPlan || 'free').toUpperCase()}</Text></Text>
      <View style={{ height: 12 }} />
      {plans.map((p) => (
        <View key={p.id} style={[styles.card, currentPlan === p.id && styles.cardActive]}>
          <Text style={styles.cardTitle}>{p.name}</Text>
          <Text style={styles.price}><Text style={{ fontSize: 20, fontWeight: '900' }}>0</Text> €/mes</Text>
          <View style={{ marginTop: 8 }}>
            {p.benefits.map((b, i) => (
              <Text key={i} style={styles.li}>• {b}</Text>
            ))}
          </View>
          <TouchableOpacity style={[styles.btn, currentPlan === p.id ? styles.btnGhost : styles.btnPrimary]} onPress={() => (currentPlan === p.id ? null : goCheckout(p.id))}>
            <Text style={[styles.btnTxt, currentPlan === p.id && styles.btnGhostTxt]}>{currentPlan === p.id ? 'Plan actual' : 'Cambiar'}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  h1: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  sub: { color: '#64748B' },
  badge: { backgroundColor: '#EEF2FF', color: '#1D4ED8', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardActive: { borderColor: '#2563EB', borderWidth: 2 },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  price: { color: '#64748B', marginBottom: 8 },
  li: { color: '#64748B', marginTop: 4 },
  btn: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  btnPrimary: { backgroundColor: '#2563EB' },
  btnGhost: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  btnTxt: { color: '#fff', fontWeight: '900' },
  btnGhostTxt: { color: '#0F172A' },
});
