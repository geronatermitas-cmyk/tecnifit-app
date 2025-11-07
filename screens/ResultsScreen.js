// @ts-nocheck

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

// Componente para renderizar cada resultado
const ResultItem = ({ item }) => {
  const isIATask = item.category === 'IA Generada' && item.steps;

  return (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={isIATask ? 1 : 0.7}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription} numberOfLines={isIATask ? 1 : 2}>{item.description}</Text>
        
        {isIATask && (
          <View style={styles.iaStepsContainer}>
            <Text style={styles.iaStepsTitle}>Pasos de la Guía IA:</Text>
            {item.steps.map((step, index) => (
              <Text key={index} style={styles.iaStepText}>
                {step}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.itemFooter}>
          <Text style={styles.itemCategory}>🏷️ {item.category}</Text>
          <Text style={styles.itemTime}>⏱️ {item.time}</Text>
          <Text style={styles.itemDifficulty}>⭐ {item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ResultsScreen() {
  const route = useRoute();
  const { query, results } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Resultados de Búsqueda</Text>
      <Text style={styles.headerSubtitle}>
        Mostrando {results.length} resultados para: <Text style={styles.queryText}>"{query}"</Text>
      </Text>

      {results.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontraron resultados para "{query}".</Text>
          <Text style={styles.noResultsTip}>Intenta con términos más generales como "filtro" o "freno".</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => <ResultItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  queryText: {
    fontWeight: '700',
    color: '#2563EB',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  itemImage: {
    width: 100,
    height: 100,
    minHeight: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemCategory: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  itemTime: {
    fontSize: 12,
    color: '#0F172A',
  },
  itemDifficulty: {
    fontSize: 12,
    color: '#0F172A',
  },
  iaStepsContainer: {
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#EBF8FF', // Fondo azul claro para destacar
    borderRadius: 8,
  },
  iaStepsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  iaStepText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  noResultsTip: {
    fontSize: 14,
    color: '#64748B',
  },
});
