// @ts-nocheck

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMock } from '../mock_data';


export default function SearchBar({ placeholder = "Buscar tareas, tutoriales..." }) {
  const nav = useNavigation();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    if (!query.trim()) {
      console.log('Campo vacío: Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    try {
      // Simular búsqueda con datos mock
      const results = searchMock(query.trim());

      // Navegar a ResultsScreen con la consulta y los resultados
      nav.navigate('Results', { query: query.trim(), results });

      // Limpiar input
      setQuery('');
    } catch (error) {
      console.error('Error en la búsqueda simulada:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleClear = () => {
    setQuery('');
  };


  return (
    <View style={styles.container}>
      {/* Decoración discreta detrás de la barra de búsqueda */}
      <View style={styles.decoration} />
      <View style={styles.searchBox}>
        {/* Icono de búsqueda (Emoji estable) */}
        <Text style={[styles.icon, { fontSize: 20, color: '#94A3B8' }]}>🔍</Text>

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

        {/* Botón limpiar (Emoji estable) */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={{ fontSize: 20, color: '#94A3B8' }}>❌</Text>
          </TouchableOpacity>
        )}

        {/* Botón buscar (Emoji estable) */}
        <TouchableOpacity
          style={[styles.searchButton, loading && { opacity: 0.6 }]}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ fontSize: 18, color: '#fff' }}>➤</Text>
          )}
        </TouchableOpacity>
      </View>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    // Ajuste para que la decoración se vea
    paddingTop: 20, // Aumentar el padding superior para dar espacio a la decoración
    // Centrar y limitar ancho
    alignItems: 'center',
    position: 'relative', // Para que la decoración se posicione correctamente
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente restaurado
    borderRadius: 12,
    // Borde más sutil
    borderWidth: 1,
    borderColor: '#E2E8F0', // Borde gris claro restaurado
    // Se elimina backdropFilter
    paddingHorizontal: 12,
    height: 48,
    width: '100%',
    maxWidth: 600, // Limitar ancho
    zIndex: 10, // Asegura que la barra de búsqueda esté por encima de la decoración
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

  decoration: {
    position: 'absolute',
    top: 10, // Ajuste de posición
    width: '100%',
    maxWidth: 620, // Un poco más ancho que la barra de búsqueda
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fondo casi invisible para la decoración
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    zIndex: 5, // Detrás de la barra de búsqueda
  },
});
