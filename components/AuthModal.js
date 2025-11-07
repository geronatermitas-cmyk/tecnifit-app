// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useAuth } from '../store/AuthStore';


// Componente de Login
function LoginView({ onLogin, onSwitchToSignup, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce email y contraseña.');
      return;
    }
    onLogin({ email, password });
  };

  return (
    <>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Accede a tu cuenta con email y contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.buttonText, { color: '#fff' }]}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToSignup}>
        <Text style={styles.linkText}>¿No tienes cuenta? **Crear Cuenta**</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.line} />
      </View>
    </>
  );
}

// Componente de Registro
function SignupView({ onSignup, onSwitchToLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce email y contraseña.');
      return;
    }
    onSignup({ email, password });
  };

  return (
    <>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Regístrate con email y contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.buttonText, { color: '#fff' }]}>Crear Cuenta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToLogin}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? **Iniciar Sesión**</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.line} />
      </View>
    </>
  );
}


export default function AuthModal({ visible, onClose }) {

  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login'); // 'login' | 'signup'

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      await signIn({ email, password });
      Alert.alert('Éxito', 'Sesión iniciada correctamente.');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({ email, password }) => {
    setLoading(true);
    try {
      // Simulación de registro
      await signUp({ email, password });
      Alert.alert('Éxito', 'Cuenta creada. Sesión iniciada.');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al crear cuenta.');
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

          {view === 'login' ? (
            <LoginView
              onLogin={handleLogin}
              onSwitchToSignup={() => setView('signup')}
              loading={loading}
            />
          ) : (
            <SignupView
              onSignup={handleSignup}
              onSwitchToLogin={() => setView('login')}
              loading={loading}
            />
          )}

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

          {/* Botón Invitado */}
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
    maxHeight: '90%', // Aumentar un poco para el formulario
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
  loginButton: {
    backgroundColor: '#2563EB',
    marginBottom: 12,
  },
  linkText: {
    textAlign: 'center',
    color: '#0F172A',
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
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
