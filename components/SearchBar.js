// @ts-nocheck

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SearchBar({ onSearch, placeholder = "Buscar tareas, tutoriales..." }) {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Campo vacío', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    try {
      // Simular búsqueda en base de datos e internet
      const results = {
        query: query.trim(),
        database: [
          { id: 1, title: 'Cómo reparar un iPhone', type: 'task', source: 'database' },
          { id: 2, title: 'Montaje de estantería', type: 'task', source: 'database' },
        ],
        internet: [
          { id: 3, title: 'Tutorial: Reparación de ' + query, type: 'tutorial', source: 'internet', url: 'https://example.com' },
          { id: 4, title: 'Guía completa de ' + query, type: 'guide', source: 'internet', url: 'https://example.com' },
        ],
      };

      // Llamar callback con resultados
      onSearch?.(results);

      // Limpiar input
      setQuery('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la búsqueda');
    } finally {
      setLoading(false);
    }
  };


  const handleClear = () => {
    setQuery('');
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        {/* Icono de búsqueda */}
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.icon} />

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#CBD5E1"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          editable={!loading}
        />

        {/* Botón limpiar */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}

        {/* Botón buscar */}
        <TouchableOpacity
          style={[styles.searchButton, loading && { opacity: 0.6 }]}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="send" size={18} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Sugerencias */}
      <View style={styles.suggestionsContainer}>
        <TouchableOpacity onPress={() => { setQuery('Reparación'); handleSearch(); }}>
          <View style={styles.suggestionTag}>
            <Ionicons name="hammer" size={14} color="#2563EB" />
            <Text style={styles.suggestionText}>Reparación</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setQuery('Montaje'); handleSearch(); }}>
          <View style={styles.suggestionTag}>
            <Ionicons name="build" size={14} color="#2563EB" />
            <Text style={styles.suggestionText}>Montaje</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setQuery('Tutorial'); handleSearch(); }}>
          <View style={styles.suggestionTag}>
            <Ionicons name="book" size={14} color="#2563EB" />
            <Text style={styles.suggestionText}>Tutorial</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 8,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  suggestionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
  },
  suggestionText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
});
