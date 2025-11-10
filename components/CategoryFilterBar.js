// components/CategoryFilterBar.js
import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * @typedef {Object} Props
 * @property {string[]} categories
 * @property {string|null|undefined} [selectedCategory]
 * @property {(c: string) => void} onSelectCategory
 * @property {any} [style]  // opcional
 */

/** @param {Props} props */
const CategoryFilterBar = ({
  categories = [],
  selectedCategory = null,
  onSelectCategory,
  style = undefined,              // 👈 valor por defecto (opcional)
}) => {
  const renderItem = useCallback(({ item }) => {
    const isActive = item === selectedCategory;
    return (
      <TouchableOpacity
        onPress={() => onSelectCategory?.(item)}
        style={[styles.chip, isActive && styles.chipActive]}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={`Filtrar por ${item}`}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]} numberOfLines={1}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedCategory, onSelectCategory]);

  return (
    <View style={[styles.container, style]}>
<<<<<<< HEAD
      <FlatList data={categories} keyExtractor={(item) => item} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContent} />
=======
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
>>>>>>> backup/2025-11-10-master
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  listContent: { paddingHorizontal: 12, gap: 8 },
<<<<<<< HEAD
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E2E2E2' },
=======
  chip: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16,
    backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E2E2E2',
  },
>>>>>>> backup/2025-11-10-master
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 14, color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
});

<<<<<<< HEAD
export default memo(CategoryFilterBar);
=======
export default memo(CategoryFilterBar);
>>>>>>> backup/2025-11-10-master
