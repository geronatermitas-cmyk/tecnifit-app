// screens/SolutionsScreen.js
import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import useProcesses from '../hooks/useProcesses';

// Heurística simple de complejidad; luego la sustituyes por IA del backend
const assessComplexity = (q = '') => {
  const s = q.toLowerCase();
  const simpleKeys = ['cambiar', 'sustituir', 'limpiar', 'montar', 'colgar', 'enchufar'];
  const hardKeys = ['instalar cableado', 'electricidad trifásica', 'gas', 'motor', 'caldera', 'bomba', 'inyector'];
  if (hardKeys.some(k => s.includes(k))) return 'complex';
  if (simpleKeys.some(k => s.includes(k))) return 'simple';
  return 'simple';
};

const ytSearch = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const googlePro = (q) =>
  `https://www.google.com/search?q=${encodeURIComponent(q)}+manual+site:%28es.stackoverflow.com+OR+bricolaje.stackexchange.com+OR+leroymerlin.es+OR+wiki.ezvid.com+OR+ifixit.com%29`;

export default function SolutionsScreen({ route, navigation }) {
  const { processes } = useProcesses(); // por si quieres proponer procesos similares
  const categoryLabel = route?.params?.categoryLabel ?? null;
  const searchText = route?.params?.searchText ?? '';
  const imageUri = route?.params?.image ?? null;

  const complexity = useMemo(() => assessComplexity(searchText), [searchText]);

  const goIllustratedGuide = () => {
    // MVP: aquí mostrarías pasos básicos o llamarías a tu backend IA
    // navigation.navigate('Results', { categoryLabel, searchText }); // si quieres mostrar procesos que coinciden
    Linking.openURL(googlePro(`${searchText} paso a paso ilustrado`));
  };

  const openVideo = () => Linking.openURL(ytSearch(searchText || categoryLabel || 'bricolaje'));
  const openProSites = () => Linking.openURL(googlePro(searchText || categoryLabel || 'reparación'));

  // Sugerencias (placeholder) de procesos similares
  const similar = useMemo(() => {
    const q = (searchText || '').toLowerCase();
    return processes.filter(p => (p.nombre || '').toLowerCase().includes(q)).slice(0, 3);
  }, [processes, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Propuestas para: {searchText || categoryLabel || 'tu consulta'}</Text>
        <Text style={styles.badge}>Complejidad estimada: {complexity === 'simple' ? 'Sencilla' : 'Compleja'}</Text>

        {imageUri ? (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Imagen aportada</Text>
            <Image source={{ uri: imageUri }} style={styles.preview} />
            <Text style={styles.caption}>En la siguiente iteración haremos OCR / visión por IA en backend.</Text>
          </View>
        ) : null}

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Opciones</Text>

          <TouchableOpacity style={[styles.option, styles.primary]} onPress={goIllustratedGuide}>
            <Text style={[styles.optionText, styles.primaryText]}>
              {complexity === 'simple' ? 'Guía ilustrada (IA)' : 'Ver guía ilustrada inicial'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={openVideo}>
            <Text style={styles.optionText}>Vídeos explicativos (YouTube)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={openProSites}>
            <Text style={styles.optionText}>Páginas especializadas</Text>
          </TouchableOpacity>
        </View>

        {similar.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Procesos similares</Text>
            {similar.map(item => (
              <View key={String(item.id ?? Math.random())} style={styles.card}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardSubtitle}>{item.descripcion}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  badge: {
    alignSelf: 'flex-start', backgroundColor: '#e0f2fe', color: '#0369a1',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, fontWeight: '600',
  },
  block: { backgroundColor: '#fff', borderRadius: 10, padding: 12, gap: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  blockTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  option: {
    height: 48, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb',
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  optionText: { fontWeight: '600', color: '#111827' },
  primary: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  primaryText: { color: '#fff' },
  preview: { width: '100%', height: 200, borderRadius: 8, backgroundColor: '#e5e7eb' },
  caption: { fontSize: 12, color: '#6b7280' },
  card: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  cardSubtitle: { fontSize: 13, color: '#6b7280' },
});