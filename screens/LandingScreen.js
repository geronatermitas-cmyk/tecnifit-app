// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthModal from '../components/AuthModal';
import SearchBar from '../components/SearchBar';


const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


export default function LandingScreen() {

  const nav = useNavigation();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(null);


  const handleSearch = (results) => {
    setSearchResults(results);
    Alert.alert(
      'Resultados de búsqueda',
      `Se encontraron ${results.database.length + results.internet.length} resultados para "${results.query}"`,
      [{ text: 'OK' }]
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Image - Mockup Phone (Ocupa toda la pantalla) */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../assets/images/mockup-phone.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Contenido debajo de la imagen */}
        <View style={styles.contentContainer}>

          {/* Título principal */}
          <Text style={styles.mainTitle}>TecnicFit Pro</Text>

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

        </View>

      </ScrollView>

      {/* SearchBar en la parte inferior */}
      <SearchBar onSearch={handleSearch} />

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
    paddingBottom: 40,
  },
  heroContainer: {
    width: screenWidth,
    height: screenHeight * 0.65,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
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
