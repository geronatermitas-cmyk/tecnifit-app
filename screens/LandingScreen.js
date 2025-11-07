// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthModal from '../components/AuthModal';


export default function LandingScreen() {

  const nav = useNavigation();
  const [authModalVisible, setAuthModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Título principal */}
        <Text style={styles.mainTitle}>TecnicFit Pro</Text>
        <Text style={styles.subtitle}>Tu asistente digital de tareas</Text>

        {/* Mascota Robot */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/robot-mascot.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* Descripción */}
        <Text style={styles.description}>
          Genera tareas inteligentes usando IA. Describe, fotografía o escanea códigos QR para obtener guías paso a paso.
        </Text>

        {/* Botón de inicio rápido */}
        <TouchableOpacity
          style={styles.quickStartButton}
          onPress={() => setAuthModalVisible(true)}
        >
          <Text style={styles.quickStartButtonText}>Inicio rápido</Text>
        </TouchableOpacity>

        {/* Botón de crear cuenta */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => nav.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

        {/* Mockup Phone */}
        <View style={styles.mockupContainer}>
          <Image
            source={require('../assets/images/mockup-phone.png')}
            style={styles.mockupImage}
            resizeMode="contain"
          />
        </View>

        {/* Características */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>¿Por qué TecnicFit?</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureText}>IA Inteligente</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📸</Text>
            <Text style={styles.featureText}>Reconocimiento de fotos</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Escaneo de códigos QR</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>Tutoriales y guías</Text>
          </View>
        </View>

      </ScrollView>

      {/* Modal de autenticación */}
      <AuthModal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    height: 200,
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  quickStartButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickStartButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  signupButtonText: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 16,
  },
  mockupContainer: {
    alignItems: 'center',
    marginBottom: 32,
    height: 300,
  },
  mockupImage: {
    width: '100%',
    height: '100%',
  },
  featuresContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
});
