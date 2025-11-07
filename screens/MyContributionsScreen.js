// @ts-nocheck

import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';

import { usePlan } from '../store/PlanStore';

import { getMyContributions } from '../utils/CollaborativeDB';


const STATUS_COLORS = {

  pending: '#F59E0B',

  approved: '#10B981',

  rejected: '#EF4444',

};


const STATUS_LABELS = {

  pending: 'Pendiente',

  approved: 'Aprobada',

  rejected: 'Rechazada',

};


export default function MyContributionsScreen() {

  const navigation = useNavigation();

  const { user } = useAuth();

  const { isColab } = usePlan();

  const [contributions, setContributions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);


  useFocusEffect(

    React.useCallback(() => {

      loadContributions();

    }, [])

  );


  const loadContributions = async () => {

    setLoading(true);

    try {

      const result = await getMyContributions(page, 10);

      if (result.success) {

        setContributions(result.contributions);

      }

    } finally {

      setLoading(false);

    }

  };


  if (!isColab) {

    return (

      <View style={styles.container}>

        <Text style={styles.h1}>Acceso denegado</Text>

        <Text style={styles.p}>Solo usuarios COLAB pueden ver sus contribuciones.</Text>

      </View>

    );

  }


  const renderItem = ({ item }) => (

    <TouchableOpacity

      style={styles.card}

      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}

    >

      <View style={styles.cardHeader}>

        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>

        <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] }]}>

          <Text style={styles.badgeText}>{STATUS_LABELS[item.status]}</Text>

        </View>

      </View>


      <Text style={styles.cardCategory}>{item.category}</Text>

      <Text style={styles.cardDifficulty}>Dificultad: {item.difficulty}</Text>


      <View style={styles.cardFooter}>

        <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>

        {item.status === 'approved' && (

          <Text style={styles.cardViews}>👁 {item.views || 0} vistas</Text>

        )}

      </View>


      {item.status === 'rejected' && item.rejectionReason && (

        <View style={styles.rejectionBox}>

          <Text style={styles.rejectionLabel}>Motivo del rechazo:</Text>

          <Text style={styles.rejectionText}>{item.rejectionReason}</Text>

        </View>

      )}

    </TouchableOpacity>

  );


  return (

    <View style={styles.container}>

      <Text style={styles.h1}>Mis contribuciones</Text>

      <Text style={styles.subtitle}>Tareas que has enviado para validación</Text>


      {loading ? (

        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />

      ) : contributions.length === 0 ? (

        <View style={styles.empty}>

          <Text style={styles.emptyText}>No has contribuido tareas aún</Text>

          <TouchableOpacity

            style={styles.btn}

            onPress={() => navigation.navigate('Contribute')}

          >

            <Text style={styles.btnText}>Crear primera tarea</Text>

          </TouchableOpacity>

        </View>

      ) : (

        <FlatList

          data={contributions}

          keyExtractor={(item) => item.id}

          renderItem={renderItem}

          scrollEnabled={false}

          contentContainerStyle={{ paddingTop: 12 }}

        />

      )}


      {!loading && contributions.length > 0 && (

        <TouchableOpacity

          style={styles.btn}

          onPress={() => navigation.navigate('Contribute')}

        >

          <Text style={styles.btnText}>+ Crear nueva tarea</Text>

        </TouchableOpacity>

      )}

    </View>

  );

}


const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },

  h1: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 4 },

  subtitle: { color: '#64748B', marginBottom: 16 },

  card: {

    backgroundColor: '#fff',

    borderRadius: 12,

    padding: 14,

    marginBottom: 12,

    borderWidth: 1,

    borderColor: '#E2E8F0',

  },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },

  cardTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', flex: 1, marginRight: 8 },

  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },

  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  cardCategory: { color: '#64748B', fontSize: 14, marginBottom: 4 },

  cardDifficulty: { color: '#64748B', fontSize: 14, marginBottom: 8 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  cardDate: { color: '#94A3B8', fontSize: 12 },

  cardViews: { color: '#64748B', fontSize: 12 },

  rejectionBox: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#FEE2E2', backgroundColor: '#FEF2F2', padding: 10, borderRadius: 8 },

  rejectionLabel: { color: '#B91C1C', fontWeight: '700', marginBottom: 4 },

  rejectionText: { color: '#7F1D1D', fontSize: 14 },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  emptyText: { fontSize: 16, color: '#64748B', marginBottom: 16 },

  btn: { backgroundColor: '#2563EB', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },

  btnText: { color: '#fff', fontWeight: '900', fontSize: 16 },

});
