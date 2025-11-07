// @ts-nocheck

import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';

import { usePlan } from '../store/PlanStore';

import { contributeTask } from '../utils/CollaborativeDB';

import { validateRequired } from '../utils/Validators';


const CATEGORIES = ['Reparación', 'Montaje', 'Mantenimiento', 'Limpieza', 'Instalación', 'Otro'];

const DIFFICULTIES = ['Básico', 'Intermedio', 'Avanzado'];


export default function ContributeScreen() {

  const navigation = useNavigation();

  const { user } = useAuth();

  const { isColab } = usePlan();

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('Reparación');

  const [difficulty, setDifficulty] = useState('Intermedio');

  const [time, setTime] = useState('');

  const [tools, setTools] = useState('');

  const [steps, setSteps] = useState('');

  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [difficultyOpen, setDifficultyOpen] = useState(false);


  // Validar que sea COLAB

  if (!isColab) {

    return (

      <View style={styles.container}>

        <Text style={styles.h1}>Acceso denegado</Text>

        <Text style={styles.p}>Solo usuarios COLAB pueden contribuir tareas.</Text>

        <TouchableOpacity

          style={styles.btn}

          onPress={() => navigation.navigate('Plans')}

        >

          <Text style={styles.btnText}>Ver planes</Text>

        </TouchableOpacity>

      </View>

    );

  }


  const onSubmit = async () => {

    // Validar campos obligatorios

    if (!validateRequired(title)) {

      Alert.alert('Error', 'El título es obligatorio');

      return;

    }

    if (!validateRequired(description)) {

      Alert.alert('Error', 'La descripción es obligatoria');

      return;

    }


    setLoading(true);

    try {

      const taskData = {

        title: title.trim(),

        description: description.trim(),

        category,

        difficulty,

        timeEstimated: time ? parseInt(time) : null,

        tools: tools.trim() ? tools.split(',').map(t => t.trim()) : [],

        steps: steps.trim() ? steps.split('\n').filter(s => s.trim()) : [],

        notes: notes.trim() || null,

        createdBy: user?.email,

      };


      const result = await contributeTask(taskData);


      if (result.success) {

        Alert.alert('Éxito', 'Tarea enviada para validación. ¡Gracias por contribuir!');

        // Limpiar formulario

        setTitle('');

        setDescription('');

        setCategory('Reparación');

        setDifficulty('Intermedio');

        setTime('');

        setTools('');

        setSteps('');

        setNotes('');

        // Ir a mis contribuciones

        navigation.navigate('MyContributions');

      } else {

        Alert.alert('Error', result.error || 'No se pudo enviar la tarea');

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      <Text style={styles.h1}>Contribuir tarea</Text>

      <Text style={styles.subtitle}>Crea una nueva tarea para la base de datos colaborativa</Text>


      {/* Título */}

      <Text style={styles.label}>Título *</Text>

      <TextInput

        style={styles.input}

        placeholder="Ej: Cambiar rueda de bicicleta"

        value={title}

        onChangeText={setTitle}

        editable={!loading}

      />


      {/* Descripción */}

      <Text style={styles.label}>Descripción *</Text>

      <TextInput

        style={[styles.input, styles.textArea]}

        placeholder="Describe la tarea en detalle..."

        value={description}

        onChangeText={setDescription}

        multiline

        numberOfLines={5}

        editable={!loading}

      />


      {/* Categoría */}

      <Text style={styles.label}>Categoría</Text>

      <TouchableOpacity

        style={styles.select}

        onPress={() => setCategoryOpen(true)}

        disabled={loading}

      >

        <Text style={styles.selectText}>{category}</Text>

        <Text style={styles.selectArrow}>▼</Text>

      </TouchableOpacity>


      {/* Dificultad */}

      <Text style={styles.label}>Nivel de dificultad</Text>

      <TouchableOpacity

        style={styles.select}

        onPress={() => setDifficultyOpen(true)}

        disabled={loading}

      >

        <Text style={styles.selectText}>{difficulty}</Text>

        <Text style={styles.selectArrow}>▼</Text>

      </TouchableOpacity>


      {/* Tiempo estimado */}

      <Text style={styles.label}>Tiempo estimado (minutos)</Text>

      <TextInput

        style={styles.input}

        placeholder="Ej: 30"

        value={time}

        onChangeText={setTime}

        keyboardType="number-pad"

        editable={!loading}

      />


      {/* Herramientas */}

      <Text style={styles.label}>Herramientas necesarias (separadas por comas)</Text>

      <TextInput

        style={[styles.input, styles.textArea]}

        placeholder="Ej: Destornillador, Martillo, Llave inglesa"

        value={tools}

        onChangeText={setTools}

        multiline

        numberOfLines={3}

        editable={!loading}

      />


      {/* Pasos */}

      <Text style={styles.label}>Pasos (uno por línea)</Text>

      <TextInput

        style={[styles.input, styles.textArea]}

        placeholder="1. Primer paso&#10;2. Segundo paso&#10;3. Tercer paso"

        value={steps}

        onChangeText={setSteps}

        multiline

        numberOfLines={5}

        editable={!loading}

      />


      {/* Notas */}

      <Text style={styles.label}>Notas adicionales</Text>

      <TextInput

        style={[styles.input, styles.textArea]}

        placeholder="Consejos, advertencias, etc."

        value={notes}

        onChangeText={setNotes}

        multiline

        numberOfLines={3}

        editable={!loading}

      />


      {/* Botón enviar */}

      <TouchableOpacity

        style={[styles.btn, loading && styles.btnDisabled]}

        onPress={onSubmit}

        disabled={loading}

      >

        <Text style={styles.btnText}>{loading ? 'Enviando...' : 'Enviar para validación'}</Text>

      </TouchableOpacity>


      {/* Modal Categoría */}

      <Modal visible={categoryOpen} transparent animationType="fade" onRequestClose={() => setCategoryOpen(false)}>

        <View style={styles.backdrop}>

          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Seleccionar categoría</Text>

            {CATEGORIES.map((cat) => (

              <TouchableOpacity

                key={cat}

                style={styles.modalItem}

                onPress={() => {

                  setCategory(cat);

                  setCategoryOpen(false);

                }}

              >

                <Text style={[styles.modalItemText, category === cat && styles.modalItemActive]}>

                  {cat}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </Modal>


      {/* Modal Dificultad */}

      <Modal visible={difficultyOpen} transparent animationType="fade" onRequestClose={() => setDifficultyOpen(false)}>

        <View style={styles.backdrop}>

          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Seleccionar dificultad</Text>

            {DIFFICULTIES.map((diff) => (

              <TouchableOpacity

                key={diff}

                style={styles.modalItem}

                onPress={() => {

                  setDifficulty(diff);

                  setDifficultyOpen(false);

                }}

              >

                <Text style={[styles.modalItemText, difficulty === diff && styles.modalItemActive]}>

                  {diff}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </Modal>

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },

  h1: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 4 },

  subtitle: { color: '#64748B', marginBottom: 16 },

  label: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 6 },

  input: {

    backgroundColor: '#fff',

    borderColor: '#E2E8F0',

    borderWidth: 1,

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingVertical: 12,

    fontSize: 16,

  },

  textArea: { height: 100, textAlignVertical: 'top' },

  select: {

    backgroundColor: '#fff',

    borderColor: '#E2E8F0',

    borderWidth: 1,

    borderRadius: 12,

    paddingHorizontal: 14,

    paddingVertical: 12,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

  },

  selectText: { fontSize: 16, color: '#0F172A' },

  selectArrow: { color: '#64748B' },

  btn: {

    backgroundColor: '#2563EB',

    borderRadius: 12,

    paddingVertical: 14,

    alignItems: 'center',

    marginTop: 20,

  },

  btnDisabled: { opacity: 0.6 },

  btnText: { color: '#fff', fontWeight: '900', fontSize: 16 },

  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },

  modal: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '80%' },

  modalTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 12 },

  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },

  modalItemText: { fontSize: 16, color: '#334155' },

  modalItemActive: { color: '#2563EB', fontWeight: '700' },

});
