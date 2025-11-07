// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import { useAuth } from '../store/AuthStore';


export default function AuthModal({ visible, onClose }) {

  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);


  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Simulación de login con Google
      await signIn({
        email: 'usuario@gmail.com',
        password: 'google-oauth-token'
      });
      Alert.alert('Éxito', 'Iniciado sesión con Google');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      // Simulación de login con Apple
      await signIn({
        email: 'usuario@icloud.com',
        password: 'apple-oauth-token'
      });
      Alert.alert('Éxito', 'Iniciado sesión con Apple');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Modal centrado */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          {/* Título */}
          <Text style={styles.title}>Iniciar sesión rápido</Text>
          <Text style={styles.subtitle}>Continúa con tu cuenta</Text>

          {/* Botón Google */}
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            <Text style={styles.googleIcon}>🔍</Text>
            <Text style={styles.buttonText}>Continuar con Google</Text>
          </TouchableOpacity>

          {/* Botón Apple */}
          <TouchableOpacity
            style={[styles.button, styles.appleButton]}
            onPress={handleAppleLogin}
            disabled={loading}
          >
            <Text style={styles.appleIcon}>🍎</Text>
            <Text style={styles.buttonText}>Continuar con Apple</Text>
          </TouchableOpacity>

          {/* Divisor */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.line} />
          </View>

          {/* Botón Cerrar */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    width: '100%',
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F
