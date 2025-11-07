// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AuthModal from '../components/AuthModal';
import SearchBar from '../components/SearchBar';




const { height: screenHeight, width: screenWidth } = Dimensions.get('window');


export default function LandingScreen() {

  const nav = useNavigation();
  const route = useRoute();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Usamos useFocusEffect para asegurar que el modal se abra cada vez que la pantalla se enfoca
  // y el parámetro esté presente, incluso si la navegación es a la misma pantalla.
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.openAuthModal) {
        setAuthModalVisible(true);
        // Limpiar el parámetro inmediatamente para evitar que se abra de nuevo
        nav.setParams({ openAuthModal: undefined });
      }
      // El array de dependencias está vacío porque queremos que se ejecute en cada foco
    }, [route.params?.openAuthModal]) // Dependencia clave para re-ejecutar cuando el parámetro cambia
  );







  const handleSearch = (results) => {
    setSearchResults(results);
    console.log(`Resultados de búsqueda: Se encontraron ${results.database.length + results.internet.length} resultados para "${results.query}"`);
  };


  return (
    <View style={styles.container}>
      {/* Hero Image - Mockup Phone (Fija en el fondo) */}
      <View style={styles.heroContainer}>
        <Image
          source={require('../assets/images/mockup-phone.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Contenido debajo de la imagen */}
        <View style={styles.contentContainer}>

          {/* Líneas de Énfasis (Decoración Superior) */}
          <View style={styles.titleDecorationContainer}>
            <View style={styles.titleLine} />
            <View style={styles.titleLine} />
          </View>

          {/* Título principal */}
          <Text style={styles.mainTitle}>TecnicFit Pro</Text>

          {/* Descripción */}
          <Text style={styles.description}>
            Genera tareas inteligentes usando IA. Describe, fotografía o escanea códigos QR para obtener guías paso a paso.
          </Text>



          {/* Características - Rediseño a cuadrícula */}
          <Text style={styles.featuresTitle}>¿Por qué TecnicFit?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureCardTitle}>IA Inteligente</Text>
              <Text style={styles.featureCardText}>Identifica piezas y genera guías.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📸</Text>
              <Text style={styles.featureCardTitle}>Reconocimiento Visual</Text>
              <Text style={styles.featureCardText}>Sube una foto y obtén la solución.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureCardTitle}>Escaneo QR</Text>
              <Text style={styles.featureCardText}>Acceso instantáneo a manuales.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📚</Text>
              <Text style={styles.featureCardTitle}>Guías Paso a Paso</Text>
              <Text style={styles.featureCardText}>Tutoriales detallados y verificados.</Text>
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
  // Contenedor de la imagen fuera del ScrollView
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  scrollContent: {
    paddingTop: screenHeight, // Empuja el contenido hacia abajo
    paddingBottom: 40,
  },
  heroContainer: {
    width: screenWidth,
    height: screenHeight,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente para legibilidad
    position: 'absolute', // Fija la imagen en el fondo
    top: 0,
    left: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semitransparente para el efecto cristal
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -40, // Superpone ligeramente con la imagen
    // Efecto de vidrio esmerilado (Frosted Glass)
    backdropFilter: 'blur(10px)',
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

  featuresTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleDecorationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  titleLine: {
    width: '30%',
    height: 2,
    backgroundColor: '#2563EB',
    opacity: 0.5,
    borderRadius: 1,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    width: '48%', // Dos tarjetas por fila
    backgroundColor: 'transparent', // Fondo transparente para que el efecto cristal del contentContainer se aplique a la tarjeta
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureIcon: {
    fontSize: 48, // Aumentado de 32 a 48
    marginBottom: 8,
    color: '#2563EB', // Color azul para destacar
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  featureCardText: {
    fontSize: 12,
    color: '#64748B',
  },
});
