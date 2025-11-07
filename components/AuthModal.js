// @ts-nocheck

import React, { useState } from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';


export default function AuthModal({ visible, onClose }) {
  const navigation = useNavigation();

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
      // El signIn en AuthStore.js ya maneja la navegación a 'Panel'
      onClose();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      // Podríamos mostrar un Toast o un mensaje de error aquí si fuera necesario
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
      // El signIn en AuthStore.js ya maneja la navegación a 'Panel'
      onClose();
    } catch (error) {
      console.error('Error al iniciar sesión con Apple:', error);
      // Podríamos mostrar un Toast o un mensaje de error aquí si fuera necesario
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
          <Text style={styles.title}>Acceso a TecnicFit Pro</Text>
          <Text style={styles.subtitle}>Inicia sesión o regístrate para acceder a todas las funcionalidades.</Text>

          {/* Botón Email/Contraseña */}
          <TouchableOpacity
            style={[styles.button, styles.emailButton]}
            onPress={() => {
              onClose(); // Cerrar el modal
              navigation.navigate('Login'); // Navegar a la pantalla de Login
            }}
          >
            <Text style={styles.emailIcon}>📧</Text>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Continuar con Email</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.line} />
          </View>

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
            <Text style={[styles.buttonText, { color: '#fff' }]}>Continuar con Apple</Text>
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
            <Text style={styles.closeButtonText}>Continuar como Invitado</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
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
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  emailButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  emailIcon: {
    fontSize: 20,
    marginRight: 10,
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
    color: '#0F172A',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  closeButtonText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 16,
  },
});
