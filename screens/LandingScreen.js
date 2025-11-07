// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthModal from '../components/AuthModal';
import SearchBar from '../components/SearchBar';




const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


export default function LandingScreen() {

  const nav = useNavigation();
  const route = useRoute();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (route.params?.openAuthModal) {
      setAuthModalVisible(true);
      // Limpiar el parámetro para que no se abra de nuevo al volver
      nav.setParams({ openAuthModal: undefined });
    }
  }, [route.params?.openAuthModal]);







  const handleSearch = (results) => {
    setSearchResults(results);
    console.log(`Resultados de búsqueda: Se encontraron ${results.database.length + results.internet.length} resultados para "${results.query}"`);
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
    height: screenHeight * 0.75,
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
