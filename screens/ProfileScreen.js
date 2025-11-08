// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implementar guardado en AuthStore
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name?.charAt(0)?.toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.userName}>{name || 'Usuario'}</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        {/* Nombre */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#CBD5E1"
          />
        </View>

        {/* Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            placeholder="tu@email.com"
            value={email}
            editable={false}
            placeholderTextColor="#CBD5E1"
          />
          <Text style={styles.helperText}>No se puede cambiar el correo</Text>
        </View>

        {/* Teléfono */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Teléfono (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="+34 600 123 456"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#CBD5E1"
            keyboardType="phone-pad"
          />
        </View>

        {/* Empresa */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Empresa/Negocio (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Mi Empresa"
            value={company}
            onChangeText={setCompany}
            placeholderTextColor="#CBD5E1"
          />
        </View>

        {/* Mensaje de guardado */}
        {saved && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>✓ Perfil guardado correctamente</Text>
          </View>
        )}

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Información */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información de la Cuenta</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>ID de Usuario</Text>
          <Text style={styles.infoValue}>{user?.token?.substring(0, 12)}...</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Rol</Text>
          <Text style={styles.infoValue}>{(user?.role || 'free').toUpperCase()}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Miembro desde</Text>
          <Text style={styles.infoValue}>Noviembre 2025</Text>
        </View>
      </View>

      {/* Espacio para scroll */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  form: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#94A3B8',
  },
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  successMessage: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  successText: {
    color: '#166534',
    fontWeight: '700',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  infoSection: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
});
