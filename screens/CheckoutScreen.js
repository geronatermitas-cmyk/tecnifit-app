import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import { usePlan } from '../store/PlanStore';

export default function CheckoutScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, updateRole } = useAuth();
  const { currentPlan, selectPlan, plans } = usePlan();

  const target = String(route.params?.planId || '').toLowerCase();
  const exists = plans.find((p) => p.id === target);

  const goLogin = () => navigation.navigate('Login', { next: { name: 'Checkout', params: { planId: target } } });
  const goSignup = () => navigation.navigate('Signup');

  const onConfirm = async () => {
    if (!exists) {
      Alert.alert('Plan no válido');
      return;
    }
    try {
      const nextRole = target === 'colab' ? 'colab' : target === 'pro' ? 'pro' : 'free';
      await updateRole(nextRole);
      await selectPlan(target);
      navigation.reset({ index: 0, routes: [{ name: 'Panel' }] });
    } catch (e) {
      Alert.alert('No se pudo actualizar el plan', e?.message || 'Inténtalo de nuevo');
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Confirmar plan</Text>
      {exists ? (
        <>
          <Text style={styles.p}>Vas a cambiar a: <Text style={styles.badge}>{exists.name}</Text></Text>
          <View style={{ height: 8 }} />
          {exists.benefits.map((b, i) => (
            <Text key={i} style={styles.li}>• {b}</Text>
          ))}
          <View style={{ height: 20 }} />
          {!user ? (
            <>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={goLogin}>
                <Text style={styles.btnTxt}>Iniciar sesión para continuar</Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={goSignup}>
                <Text style={[styles.btnTxt, styles.btnGhostTxt]}>Crear cuenta</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{ color: '#64748B', marginBottom: 8 }}>Plan actual: {(currentPlan || 'free').toUpperCase()}</Text>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onConfirm}>
                <Text style={styles.btnTxt}>Confirmar cambio</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <Text style={styles.p}>No se reconoce el plan solicitado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff', padding: 16 },
  h1: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 10 },
  p: { color: '#334155' },
  li: { color: '#334155', marginTop: 4 },
  badge: { backgroundColor: '#EEF2FF', color: '#1D4ED8', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  btn: { alignItems: 'center', paddingVertical: 14, borderRadius: 12, marginTop: 12 },
  btnPrimary: { backgroundColor: '#2563EB' },
  btnGhost: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1' },
  btnTxt: { color: '#fff', fontWeight: '900', fontSize: 16 },
  btnGhostTxt: { color: '#0F172A' },
});
