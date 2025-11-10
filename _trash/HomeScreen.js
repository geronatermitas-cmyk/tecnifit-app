// screens/HomeScreen.js
// @ts-nocheck
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useAuth } from '../store/AuthStore';

export default function HomeScreen({ navigation }) {
  const auth = useAuth?.();
  const role = auth?.role ?? 'guest';
  const logout = auth?.logout ?? (() => {});
  
  // Botón "Salir" en el header cuando NO eres guest
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        role !== 'guest' ? (
          <TouchableOpacity
            onPress={() => {
              logout();
              navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Salir</Text>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, role, logout]);

  // Handlers de navegación (dentro del mismo Stack "HomeStack")
  const goToSearch = () => {
    // Navega a Describe la tarea
    navigation.navigate('Search');
  };

  const goToPhotos = () => {
    // Navega a Intake con modo fotos
    navigation.navigate('Intake', { mode: 'photo' });
  };

  const goToCodes = () => {
    // Navega a Intake con modo códigos
    navigation.navigate('Intake', { mode: 'scan' });
  };

  const goToReview = () => {
    // Cambia a la pestaña Revisión (stack hermano dentro de las tabs)
    const parent = navigation.getParent?.(); // Tab navigator
    if (parent) parent.navigate('Revisión', { screen: 'Review' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TecnicFit · Inicio</Text>
      <Text style={styles.subtitle}>
        {role === 'guest'
          ? 'Estás como invitado. Puedes explorar y preparar datos.'
          : `Sesión: ${role.toUpperCase()}`}
      </Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.cardPrimary} onPress={goToSearch}>
          <Text style={styles.cardTitle}>Buscar tarea</Text>
          <Text style={styles.cardDesc}>
            Describe lo que necesitas y prepara la tarea.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={goToPhotos}>
          <Text style={styles.cardTitle}>Cargar fotos</Text>
          <Text style={styles.cardDesc}>
            Usa cámara o galería para adjuntar imágenes.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={goToCodes}>
          <Text style={styles.cardTitle}>Cargar códigos</Text>
          <Text style={styles.cardDesc}>
            Añade EAN/QR manualmente (escáner más adelante).
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardGhost} onPress={goToReview}>
          <Text style={styles.cardGhostText}>Ir a Revisión</Text>
        </TouchableOpacity>
      </View>

      {role === 'guest' && (
        <View style={styles.footer}>
          <Text style={styles.muted}>
            ¿Quieres guardar tareas y desbloquear más funciones?
          </Text>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.btnOutlineText}>Accede o crea tu cuenta</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
    backgroundColor: '#F5F6F7',
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
  },
  grid: {
    marginTop: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardPrimary: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardDesc: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
  cardGhost: {
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  cardGhostText: {
    color: '#0F172A',
    fontWeight: '800',
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
    gap: 10,
  },
  muted: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
  },
  btnOutline: {
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  btnOutlineText: {
    color: '#2563EB',
    fontWeight: '900',
  },
});