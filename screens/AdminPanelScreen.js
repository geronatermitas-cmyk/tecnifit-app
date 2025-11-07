// @ts-nocheck

import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';

import HttpClient from '../utils/HttpClient';


export default function AdminPanelScreen() {

  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [rejectionReason, setRejectionReason] = useState('');

  const [processingId, setProcessingId] = useState(null);


  useFocusEffect(

    React.useCallback(() => {

      loadPendingTasks();

    }, [])

  );


  const loadPendingTasks = async () => {

    setLoading(true);

    try {

      const result = await HttpClient.get('/api/admin/tasks/pending');

      if (result.success) {

        setTasks(result.data.tasks || []);

      }

    } finally {

      setLoading(false);

    }

  };


  // Verificar que sea admin

  if (user?.role !== 'admin') {

    return (

      <View style={styles.container}>

        <Text style={styles.h1}>Acceso denegado</Text>

        <Text style={styles.p}>Solo administradores pueden acceder a este panel.</Text>

      </View>

    );

  }


  const onApprove = async (taskId) => {

    setProcessingId(taskId);

    try {

      const result = await HttpClient.post(`/api/admin/tasks/${taskId}/approve`, {});

      if (result.success) {

        Alert.alert('Éxito', 'Tarea aprobada');

        setTasks(tasks.filter(t => t.id !== taskId));

      } else {

        Alert.alert('Error', result.error || 'No se pudo aprobar');

      }

    } finally {

      setProcessingId(null);

    }

  };


  const onReject = async (taskId) => {

    if (!rejectionReason.trim()) {

      Alert.alert('Error', 'Debes proporcionar un motivo del rechazo');

      return;

    }


    setProcessingId(taskId);

    try {

      const result = await HttpClient.post(`/api/admin/tasks/${taskId}/reject`, {

        reason: rejectionReason.trim(),

      });

      if (result.success) {

        Alert.alert('Éxito', 'Tarea rechazada');

        setTasks(tasks.filter(t => t.id !== taskId));

        setModalVisible(false);

        setRejectionReason('');

        setSelectedTask(null);

      } else {

        Alert.alert('Error', result.error || 'No se pudo rechazar');

      }

    } finally {

      setProcessingId(null);

    }

  };


  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.cardTitle}>{item.title}</Text>

      <Text style={styles.cardCategory}>{item.category}</Text>

      <Text style={styles.cardDifficulty}>Dificultad: {item.difficulty}</Text>

      <Text style={styles.cardAuthor}>Por: {item.createdBy}</Text>

      <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleString()}</Text>


      <View style={styles.cardDescription}>

        <Text style={styles.descriptionLabel}>Descripción:</Text>

        <Text style={styles.descriptionText} numberOfLines={3}>{item.description}</Text>

      </View>


      <View style={styles.actions}>

        <TouchableOpacity

          style={[styles.btn, styles.btnApprove]}

          onPress={() => onApprove(item.id)}

          disabled={processingId === item.id}

        >

          <Text style={styles.btnText}>{processingId === item.id ? '...' : '✓ Aprobar'}</Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={[styles.btn, styles.btnReject]}

          onPress={() => {

            setSelectedTask(item);

            setModalVisible(true);

          }}

          disabled={processingId === item.id}

        >

          <Text style={styles.btnText}>{processingId === item.id ? '...' : '✗ Rechazar'}</Text>

        </TouchableOpacity>

      </View>

    </View>

  );


  return (

    <View style={styles.container}>

      <Text style={styles.h1}>Panel de administración</Text>

      <Text style={styles.subtitle}>Validar tareas pendientes</Text>


      {loading ? (

        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />

      ) : tasks.length === 0 ? (

        <View style={styles.empty}>

          <Text style={styles.emptyText}>No hay tareas pendientes</Text>

        </View>

      ) : (

        <FlatList

          data={tasks}

          keyExtractor={(item) => item.id}

          renderItem={renderItem}

          scrollEnabled={false}

          contentContainerStyle={{ paddingTop: 12 }}

        />

      )}


      {/* Modal de rechazo */}

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>

        <View style={styles.backdrop}>

          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Rechazar tarea</Text>

            <Text style={styles.modalSubtitle}>{selectedTask?.title}</Text>


            <Text style={styles.label}>Motivo del rechazo</Text>

            <TextInput

              style={[styles.input, styles.textArea]}

              placeholder="Explica por qué rechazas esta tarea..."

              value={rejectionReason}

              onChangeText={setRejectionReason}

              multiline

              numberOfLines={4}

              editable={processingId === null}

            />


            <View style={styles.modalActions}>

              <TouchableOpacity

                style={[styles.btn, styles.btnCancel]}

                onPress={() => {

                  setModalVisible(false);

                  setRejectionReason('');

                  setSelectedTask(null);

                }}

                disabled={processingId !== null}

              >

                <Text style={styles.btnText}>Cancelar</Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={[styles.btn, styles.btnReject]}

                onPress={() => onReject(selectedTask?.id)}

                disabled={processingId !== null}

              >

                <Text style={styles.btnText}>{processingId ? '...' : 'Rechazar'}</Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

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

  cardTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginBottom: 6 },

  cardCategory: { color: '#64748B', fontSize: 14, marginBottom: 4 },

  cardDifficulty: { color: '#64748B', fontSize: 14, marginBottom: 4 },

  cardAuthor: { color: '#94A3B8', fontSize: 12, marginBottom: 4 },

  cardDate: { color: '#94A3B8', fontSize: 12, marginBottom: 8 },

  cardDescription: { backgroundColor: '#F8FAFC', borderRadius: 8, padding: 10, marginBottom: 12 },

  descriptionLabel: { fontWeight: '700', color: '#0F172A', marginBottom: 4 },

  descriptionText: { color: '#334155', fontSize: 14 },

  actions: { flexDirection: 'row', gap: 8 },

  btn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },

  btnApprove: { backgroundColor: '#10B981' },

  btnReject: { backgroundColor: '#EF4444' },

  btnCancel: { backgroundColor: '#E5E7EB' },

  btnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  emptyText: { fontSize: 16, color: '#64748B' },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 16 },

  modal: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },

  modalTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 4 },

  modalSubtitle: { color: '#64748B', marginBottom: 16 },

  label: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 6 },

  input: {

    backgroundColor: '#F8FAFC',

    borderColor: '#E2E8F0',

    borderWidth: 1,

    borderRadius: 8,

    paddingHorizontal: 12,

    paddingVertical: 10,

    fontSize: 14,

    marginBottom: 16,

  },

  textArea: { height: 100, textAlignVertical: 'top' },

  modalActions: { flexDirection: 'row', gap: 8 },

});
