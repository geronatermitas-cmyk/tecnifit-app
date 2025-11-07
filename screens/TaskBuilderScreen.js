import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { generateTaskMock } from '../mock_data';

// Componente para las opciones de entrada
const InputOption = ({ icon, label, onPress }) => (
  <TouchableOpacity style={inputStyles.option} onPress={onPress}>
    <Text style={inputStyles.icon}>{icon}</Text>
    <Text style={inputStyles.label}>{label}</Text>
  </TouchableOpacity>
);

export default function TaskBuilderScreen() {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateTask = () => {
    setLoading(true);
    const query = description.trim();

    // Simulación de la llamada a la IA
    setTimeout(() => {
      const iaResult = generateTaskMock(query);
      setLoading(false);
      
      // Navegar a ResultsScreen, pasando el resultado de la IA como un array de un solo elemento
      // Esto permite que ResultsScreen lo muestre como un resultado de búsqueda normal
      navigation.navigate('Results', { query: query, results: [iaResult] });
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Generador de Tareas IA</Text>
      <Text style={styles.subtitle}>Describe tu problema o usa una herramienta de entrada para generar una guía de reparación paso a paso.</Text>

      {/* Opciones de Entrada */}
      <View style={inputStyles.container}>
        <InputOption icon="📝" label="Descripción Manual" onPress={() => {}} />
        <InputOption icon="📸" label="Reconocimiento de Foto" onPress={() => {}} />
        <InputOption icon="📱" label="Escaneo de Código QR" onPress={() => {}} />
      </View>

      {/* Entrada de Texto */}
      <TextInput
        style={styles.input}
        placeholder="Ej: 'Cambiar filtro de aceite de un BMW E46'"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Botón de Generación */}
      <TouchableOpacity
        style={[styles.btn, loading && { opacity: 0.7 }]}
        onPress={handleGenerateTask}
        disabled={loading || description.length < 5}
      >
        <Text style={styles.btnTxt}>{loading ? 'Generando Tarea...' : 'Generar Guía IA'}</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🤖 Consejo: Sé lo más específico posible para obtener la mejor guía. Puedes incluir marca, modelo y año.</Text>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: '#E0F2F7',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#06B6D4',
  },
  infoText: {
    fontSize: 14,
    color: '#0891B2',
    lineHeight: 20,
  },
});

const inputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    width: '30%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  icon: {
    fontSize: 28,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
  },
});
