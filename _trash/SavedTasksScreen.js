// screens/SavedTasksScreen.js
// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useIntake } from '../store/IntakeStore';

export default function SavedTasksScreen() {
  const { savedTasks, deleteSavedTask, clearAllSaved } = useIntake();

  const confirmDeleteAll = () =>
    Alert.alert('Borrar todo', '¿Eliminar todas las tareas guardadas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: clearAllSaved },
    ]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Tarea {item.id}</Text>
        <Text style={styles.sub}>
          {new Date(item.createdAt).toLocaleString()} · 📷 {item.photos.length} · 🧾 {item.codes.length} · 📝 {item.descriptions.length}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteSavedTask(item.id)}>
        <Text style={styles.delete}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Tareas guardadas ({savedTasks.length})</Text>

      <FlatList
        data={savedTasks}
        keyExtractor={(t) => t.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay tareas guardadas.</Text>}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      {savedTasks.length > 0 && (
        <TouchableOpacity style={styles.dangerBtn} onPress={confirmDeleteAll}>
          <Text style={styles.dangerBtnText}>Borrar todas</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:20 },
  h1:{ fontSize:22, fontWeight:'800', marginBottom:12 },
  row:{ flexDirection:'row', alignItems:'center' },
  title:{ fontWeight:'700' },
  sub:{ color:'#64748B', marginTop:4 },
  delete:{ color:'#EF4444', fontWeight:'700', padding:8 },
  sep:{ height:12 },
  dangerBtn:{ marginTop:16, backgroundColor:'#EF4444', borderRadius:12, paddingVertical:14, alignItems:'center' },
  dangerBtnText:{ color:'#fff', fontWeight:'800' },
});