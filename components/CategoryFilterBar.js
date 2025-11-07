import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryFilterBar = ({ categories = [], selectedCategory = null, onSelectCategory, style = undefined }) => {
  const renderItem = useCallback(({ item }) => {
    const isActive = item === selectedCategory;
    return (
      <TouchableOpacity onPress={() => onSelectCategory?.(item)} style={[styles.chip, isActive && styles.chipActive]} activeOpacity={0.8}>
        <Text style={[styles.chipText, isActive && styles.chipTextActive]} numberOfLines={1}>{item}</Text>
      </TouchableOpacity>
    );
  }, [selectedCategory, onSelectCategory]);

  return (
    <View style={[styles.container, style]}>
      <FlatList data={categories} keyExtractor={(item) => item} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  listContent: { paddingHorizontal: 12, gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#E2E2E2' },
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 14, color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
});

export default memo(CategoryFilterBar);
