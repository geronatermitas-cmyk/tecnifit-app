// @ts-nocheck
import React, { createContext, useContext, useMemo, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const Ctx = createContext(null);

export function IntakeProvider({ children }) {
  const [items, setItems] = useState([]);        // [{id, kind:'text'|'code', value}]
  const [selectedIds, setSelectedIds] = useState(new Set());

  const addTextItem = (value) => setItems(prev => [{ id: uuid(), kind: 'text', value }, ...prev]);
  const addCodeItem = (value) => setItems(prev => [{ id: uuid(), kind: 'code', value }, ...prev]);

  const toggleSelect = (id) => setSelectedIds(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const removeSelected = () => setItems(prev => prev.filter(it => !selectedIds.has(it.id))) || setSelectedIds(new Set());
  const clearAll = () => { setItems([]); setSelectedIds(new Set()); };

  const value = useMemo(() => ({
    items, addTextItem, addCodeItem,
    selectedIds, toggleSelect, removeSelected, clearAll,
  }), [items, selectedIds]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useIntake = () => useContext(Ctx);
