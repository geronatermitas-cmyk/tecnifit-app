// @ts-nocheck

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';


/**
* AuthStore simple para MVP
* - Persistimos {token, email, name, role}
* - Migra de clave antigua con ":" a nueva sin ":" (Android)
*/


const KEY = 'tecnicfit_user'; // ✅ nueva
const LEGACY_KEYS = ['tecnicfit:user']; // ❌ antigua
const Ctx = createContext(null);


export function AuthProvider({ children }) {

const [user, setUser] = useState(null);

const [isLoading, setLoading] = useState(true);


useEffect(() => {

(async () => {

try {

// leer nueva

let raw = await SecureStore.getItemAsync(KEY);

// si no hay, migrar legacy

if (!raw) {

for (const k of LEGACY_KEYS) {

try {

const legacyRaw = await SecureStore.getItemAsync(k);

if (legacyRaw) {

raw = legacyRaw;

await SecureStore.setItemAsync(KEY, legacyRaw);

try { await SecureStore.deleteItemAsync(k); } catch {}

break;

}

} catch {}

}

}

if (raw) setUser(JSON.parse(raw));

} catch {}

setLoading(false);

})();

}, []);


const persist = async (u) => {

setUser(u);

try { await SecureStore.setItemAsync(KEY, JSON.stringify(u)); } catch {}

};

const clear = async () => {

setUser(null);

try { await SecureStore.deleteItemAsync(KEY); } catch {}

};


// API simulada

const signIn = async ({ email, password }) => {

if (!email || !password) throw new Error('Faltan credenciales');

const current = user ?? { token: 'demo-token', email, name: email.split('@')[0], role: 'free' };

await persist(current);

return current;

};

const signUp = async ({ name, email, password }) => {

if (!name || !email || !password) throw new Error('Completa todos los campos');

const newUser = { token: 'demo-token', email, name, role: 'free' };

await persist(newUser);

return newUser;

};

const signOut = async () => { await clear(); };

const updateRole = async (role) => {

const next = { ...(user||{}), role };

await persist(next);

return next;

};


// límites demo

const limits = { maxTasksPerDay: 3 };

const usedToday = 0;


const value = useMemo(() => ({

user, isLoading, signIn, signUp, signOut, updateRole, limits, usedToday

}), [user, isLoading, usedToday]);


return <Ctx.Provider value={value}>{children}</Ctx.Provider>;

}


export const useAuth = () => useContext(Ctx);
