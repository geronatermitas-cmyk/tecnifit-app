import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import { usePlan } from '../store/PlanStore';

// Componente de tarjeta de navegación
const NavCard = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.navCard} onPress={onPress}>
    <Text style={styles.navIcon}>{icon}</Text>
    <View style={styles.navTextContainer}>
      <Text style={styles.navTitle}>{title}</Text>
      <Text style={styles.navSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.navArrow}>›</Text>
  </TouchableOpacity>
);

export default function PanelScreen() {
  const navigation = useNavigation();
  const { user, limits, usedToday } = useAuth();
  const { currentPlan } = usePlan(); // Asumiendo que usePlan expone currentPlan

  const userName = user?.name || user?.email?.split('@')[0] || 'Usuario';
  const currentLimit = limits?.maxTasksPerDay || 3;
  const tasksRemaining = currentLimit - (usedToday || 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Sección de Bienvenida y Cuota */}
      <View style={styles.header}>
        <Text style={styles.hi}>Hola, {userName}</Text>
        <Text style={styles.planText}>Plan Actual: {currentPlan?.name || 'Gratuito'}</Text>
      </View>

      {/* Tarjeta de Cuota */}
      <View style={styles.quotaCard}>
        <Text style={styles.quotaTitle}>Tareas IA Restantes Hoy</Text>
        <Text style={styles.quotaCount}>{tasksRemaining} / {currentLimit}</Text>
        <Text style={styles.quotaSubtext}>
          {tasksRemaining > 0 
            ? `Tienes ${tasksRemaining} tareas IA disponibles.`
            : 'Has alcanzado tu límite diario. Considera un plan Pro.'
          }
        </Text>
        <TouchableOpacity 
          style={styles.upgradeButton} 
          onPress={() => navigation.navigate('Plans')}
        >
          <Text style={styles.upgradeButtonText}>Ver Planes Pro</Text>
        </TouchableOpacity>
      </View>

      {/* Acciones Principales */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <NavCard 
        icon="🛠️" 
        title="Generar Nueva Tarea IA" 
        subtitle="Crea una guía de reparación paso a paso al instante." 
        onPress={() => navigation.navigate('TaskBuilder')} 
      />
      <NavCard 
        icon="📚" 
        title="Historial de Tareas" 
        subtitle="Revisa y reutiliza tus guías de reparación anteriores." 
        onPress={() => navigation.navigate('History')} 
      />
      <NavCard 
        icon="⭐" 
        title="Mis Planes" 
        subtitle="Gestiona tu suscripción y beneficios Pro." 
        onPress={() => navigation.navigate('Plans')} 
      />
      
      {/* Sección de Cuenta */}
      <Text style={styles.sectionTitle}>Configuración de Cuenta</Text>
      <NavCard 
        icon="👤" 
        title="Mi Perfil" 
        subtitle="Actualiza tu información personal y preferencias." 
        onPress={() => { /* navigation.navigate('Profile') */ }} 
      />
      <NavCard 
        icon="🚪" 
        title="Cerrar Sesión" 
        subtitle="Finaliza tu sesión actual." 
        onPress={async () => {
          await user.signOut();
          navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
        }} 
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC', 
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  hi: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#0F172A',
  },
  planText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 4,
  },
  quotaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quotaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  quotaCount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 8,
  },
  quotaSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: '#FBBF24', // Amarillo para destacar
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 15,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  navIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  navTextContainer: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  navSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  navArrow: {
    fontSize: 24,
    color: '#94A3B8',
    marginLeft: 10,
  },
});
