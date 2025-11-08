// @ts-nocheck

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavigationMenu from '../components/NavigationMenu';

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

  // Este componente será usado con headerRight en App.js
  ResultsScreen.headerRight = () => <NavigationMenu showProfile={true} />;

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
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 0,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  queryText: {
    fontWeight: '700',
    color: '#2563EB',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    minHeight: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 11,
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
    padding: 8,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  iaStepsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  iaStepText: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsTip: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});
