// @ts-nocheck

import React, { createContext, useContext, useMemo, useState } from 'react';

import 'react-native-get-random-values';

import { v4 as uuid } from 'uuid';


const Ctx = createContext(null);


export function IntakeProvider({ children }) {

  // Lista de entradas del panel (texto, fotos simbólicas, códigos…)

  const [items, setItems] = useState([]); // [{ id, label, type: 'text'|'photo'|'code' }]

  // Historial de tareas generadas

  const [history, setHistory] = useState([]);

  // Selección (usamos array para que FlatList y "includes" sean sencillos)

  const [selectedIds, setSelectedIds] = useState([]);


  // --- Acciones expuestas (NO exponer setItems directamente) ---

  const addItem = (label, type = 'text') => {

    const t = String(label || '').trim();

    if (!t) return;

    setItems(prev => [...prev, { id: uuid(), label: t, type }]);

  };


  const addText = (t) => addItem(t, 'text');

  const addPhoto = (desc) => addItem(desc || 'Foto', 'photo');

  const addCode = (c) => addItem(c, 'code');


  const toggleSelect = (id) => {

    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  };


  const clearSelection = () => setSelectedIds([]);


  const deleteSelected = () => {

    if (selectedIds.length === 0) return;

    setItems(prev => prev.filter(it => !selectedIds.includes(it.id)));

    setSelectedIds([]);

  };


  const saveTask = (taskData) => {

    const task = {

      id: uuid(),

      createdAt: new Date().toISOString(),

      items: taskData || items,

    };

    setHistory(prev => [task, ...prev]);

    return task;

  };


  const value = useMemo(() => ({

    items, selectedIds, history,

    addItem, addText, addPhoto, addCode,

    toggleSelect, clearSelection, deleteSelected,

    saveTask,

  }), [items, selectedIds, history]);


  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;

}


export const useIntake = () => useContext(Ctx);
