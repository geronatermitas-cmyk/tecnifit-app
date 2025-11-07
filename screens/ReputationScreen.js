// @ts-nocheck

import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';

import { usePlan } from '../store/PlanStore';

import { getContributionStats, getContributorRanking } from '../utils/CollaborativeDB';


const BADGES = {

  first_contribution: { name: 'Primer paso', icon: '🎯', color: '#3B82F6' },

  five_tasks: { name: '5 tareas', icon: '⭐', color: '#F59E0B' },

  ten_tasks: { name: '10 tareas', icon: '✨', color: '#8B5CF6' },

  fifty_tasks: { name: '50 tareas', icon: '🚀', color: '#EC4899' },

  helpful_contributor: { name: 'Muy útil', icon: '👍', color: '#10B981' },

  expert: { name: 'Experto', icon: '🏆', color: '#F97316' },

};


export default function ReputationScreen() {

  const { user } = useAuth();

  const { isColab } = usePlan();

  const [stats, setStats] = useState(null);

  const [ranking, setRanking] = useState([]);

  const [loading, setLoading] = useState(true);


  useFocusEffect(

    React.useCallback(() => {

      loadData();

    }, [])

  );


  const loadData = async () => {

    setLoading(true);

    try {

      const [statsResult, rankingResult] = await Promise.all([

        getContributionStats(),

        getContributorRanking(10),

      ]);


      if (statsResult.success) {

        setStats(statsResult.stats);

      }

      if (rankingResult.success) {

        setRanking(rankingResult.ranking);

      }

    } finally {

      setLoading(false);

    }

  };


  if (!isColab) {

    return (

      <View style={styles.container}>

        <Text style={styles.h1}>Acceso denegado</Text>

        <Text style={styles.p}>Solo usuarios COLAB pueden ver reputación.</Text>

      </View>

    );

  }


  if (loading) {

    return (

      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>

        <ActivityIndicator size="large" color="#2563EB" />

      </View>

    );

  }


  return (

    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      <Text style={styles.h1}>Tu reputación</Text>


      {/* Puntos principales */}

      {stats && (

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>{stats.totalPoints || 0}</Text>

            <Text style={styles.statLabel}>Puntos totales</Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>{stats.approvedTasks || 0}</Text>

            <Text style={styles.statLabel}>Tareas aprobadas</Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>{stats.totalViews || 0}</Text>

            <Text style={styles.statLabel}>Vistas totales</Text>

          </View>

        </View>

      )}


      {/* Badges */}

      <Text style={styles.sectionTitle}>Insignias</Text>

      {stats && stats.badges && stats.badges.length > 0 ? (

        <View style={styles.badgesContainer}>

          {stats.badges.map((badgeKey) => {

            const badge = BADGES[badgeKey];

            return badge ? (

              <View key={badgeKey} style={[styles.badgeItem, { borderColor: badge.color }]}>

                <Text style={styles.badgeIcon}>{badge.icon}</Text>

                <Text style={styles.badgeName}>{badge.name}</Text>

              </View>

            ) : null;

          })}

        </View>

      ) : (

        <Text style={styles.emptyText}>Aún no tienes insignias. ¡Contribuye más tareas!</Text>

      )}


      {/* Ranking */}

      <Text style={styles.sectionTitle}>Top contribuidores</Text>

      {ranking.length > 0 ? (

        <View>

          {ranking.map((contributor, index) => (

            <View key={contributor.id} style={styles.rankingItem}>

              <View style={styles.rankingPosition}>

                <Text style={styles.rankingNumber}>#{index + 1}</Text>

              </View>

              <View style={styles.rankingInfo}>

                <Text style={styles.rankingName}>{contributor.name || 'Usuario'}</Text>

                <Text style={styles.rankingPoints}>{contributor.points} puntos</Text>

              </View>

              <Text style={styles.rankingTasks}>{contributor.tasksCount} tareas</Text>

            </View>

          ))}

        </View>

      ) : (

        <Text style={styles.emptyText}>No hay contribuidores aún</Text>

      )}


      {/* Próximas metas */}

      <Text style={styles.sectionTitle}>Próximas metas</Text>

      <View style={styles.goalsContainer}>

        <View style={styles.goalItem}>

          <Text style={styles.goalIcon}>⭐</Text>

          <View style={styles.goalContent}>

            <Text style={styles.goalTitle}>5 tareas aprobadas</Text>

            <View style={styles.goalProgress}>

              <View style={[styles.goalBar, { width: `${((stats?.approvedTasks || 0) / 5) * 100}%` }]} />

            </View>

            <Text style={styles.goalText}>{stats?.approvedTasks || 0}/5</Text>

          </View>

        </View>

        <View style={styles.goalItem}>

          <Text style={styles.goalIcon}>✨</Text>

          <View style={styles.goalContent}>

            <Text style={styles.goalTitle}>10 tareas aprobadas</Text>

            <View style={styles.goalProgress}>

              <View style={[styles.goalBar, { width: `${((stats?.approvedTasks || 0) / 10) * 100}%` }]} />

            </View>

            <Text style={styles.goalText}>{stats?.approvedTasks || 0}/10</Text>

          </View>

        </View>

      </View>

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },

  h1: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 16 },

  statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },

  statCard: {

    flex: 1,

    backgroundColor: '#fff',

    borderRadius: 12,

    padding: 14,

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#E2E8F0',

  },

  statNumber: { fontSize: 24, fontWeight: '900', color: '#2563EB', marginBottom: 4 },

  statLabel: { fontSize: 12, color: '#64748B', textAlign: 'center' },

  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 12, marginTop: 16 },

  badgesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

  badgeItem: {

    width: '48%',

    backgroundColor: '#fff',

    borderRadius: 12,

    padding: 14,

    alignItems: 'center',

    borderWidth: 2,

  },

  badgeIcon: { fontSize: 32, marginBottom: 6 },

  badgeName: { fontSize: 14, fontWeight: '700', color: '#0F172A', textAlign: 'center' },

  emptyText: { color: '#94A3B8', textAlign: 'center', marginVertical: 20 },

  rankingItem: {

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 12,

    padding: 12,

    marginBottom: 8,

    borderWidth: 1,

    borderColor: '#E2E8F0',

  },

  rankingPosition: {

    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: '#EEF2FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,

  },

  rankingNumber: { fontWeight: '900', color: '#2563EB', fontSize: 14 },

  rankingInfo: { flex: 1 },

  rankingName: { fontWeight: '700', color: '#0F172A', marginBottom: 2 },

  rankingPoints: { color: '#64748B', fontSize: 12 },

  rankingTasks: { color: '#94A3B8', fontSize: 12 },

  goalsContainer: { gap: 12, marginBottom: 20 },

  goalItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E2E8F0' },

  goalIcon: { fontSize: 24, marginRight: 12 },

  goalContent: { flex: 1 },

  goalTitle: { fontWeight: '700', color: '#0F172A', marginBottom: 6 },

  goalProgress: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },

  goalBar: { height: '100%', backgroundColor: '#2563EB' },

  goalText: { fontSize: 12, color: '#64748B' },

});
