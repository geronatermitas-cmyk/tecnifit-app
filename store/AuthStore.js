// @ts-nocheck
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

/**
 * AuthStore muy simple:
 * - Persistimos {token, email, name, role} en SecureStore
 * - signIn / signUp simulan backend (válido para el MVP). Sustituible por tu API.
 */

const KEY = 'tecnicfit:user';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // Cargar usuario persistido al arrancar
  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (_) {}
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
    // Reglas básicas para demo
    if (!email || !password) throw new Error('Faltan credenciales');
    // Si ya había “cuenta” guardada, úsala; si no, crea un perfil mínimo
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

  // (Opcional) límites/cupo de ejemplo
  const limits = { maxTasksPerDay: 3 };
  const usedToday = 0;

  const value = useMemo(
    () => ({ user, isLoading, signIn, signUp, signOut, limits, usedToday }),
    [user, isLoading, usedToday]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);