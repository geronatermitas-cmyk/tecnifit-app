// @ts-nocheck

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';


/**
* PlanStore
* - Gestiona el plan activo del usuario: 'free' | 'pro' | 'colab'
* - Persiste en SecureStore
* - Migra de claves antiguas con ":" a nuevas sin ":" (Android no lo permite)
*/


const KEY = 'tecnicfit_plan'; // ✅ clave nueva válida
const LEGACY_KEYS = ['tecnicfit:plan']; // ❌ claves antiguas a migrar
const Ctx = createContext(null);


// Beneficios para UI

const PLAN_BENEFITS = {

free: ['Uso básico del panel', 'Listas y selección', 'Resultados demo'],

pro: ['Todo lo de FREE', 'Historial personal', 'Búsquedas ampliadas', 'Generar tarea (IA)'],

colab:['Todo lo de PRO', 'Editor de procesos', 'Subir contenidos', 'Herramientas de colaboración'],

};


export function PlanProvider({ children }) {

const [currentPlan, setCurrentPlan] = useState('free');

const [loading, setLoading] = useState(true);


useEffect(() => {

(async () => {

try {

// 1) Intentar leer clave nueva

let saved = await SecureStore.getItemAsync(KEY);


// 2) Si no hay, intentar migrar de cualquier legacy

if (!saved) {

for (const k of LEGACY_KEYS) {

try {

const legacy = await SecureStore.getItemAsync(k);

if (legacy && ['free','pro','colab'].includes(legacy)) {

saved = legacy;

// Persistir en la nueva y limpiar la vieja

await SecureStore.setItemAsync(KEY, legacy);

try { await SecureStore.deleteItemAsync(k); } catch {}

break;

}

} catch {}

}

}


if (saved && ['free','pro','colab'].includes(saved)) {

setCurrentPlan(saved);

}

} catch {}

setLoading(false);

})();

}, []);


const selectPlan = async (planId) => {

const p = (planId || '').toLowerCase();

if (!['free','pro','colab'].includes(p)) return;

setCurrentPlan(p);

try { await SecureStore.setItemAsync(KEY, p); } catch {}

};


const plans = useMemo(() => ([

{ id: 'free', name: 'FREE', benefits: PLAN_BENEFITS.free, price: 0 },

{ id: 'pro', name: 'PRO', benefits: PLAN_BENEFITS.pro, price: 0 },

{ id: 'colab', name: 'COLAB', benefits: PLAN_BENEFITS.colab, price: 0 },

]), []);


const value = useMemo(() => ({

loading,

currentPlan,

selectPlan,

isFree: currentPlan === 'free',

isPro: currentPlan === 'pro',

isColab: currentPlan === 'colab',

plans,

benefits: PLAN_BENEFITS[currentPlan] || [],

}), [loading, currentPlan]);


return <Ctx.Provider value={value}>{children}</Ctx.Provider>;

}


export const usePlan = () => useContext(Ctx);
