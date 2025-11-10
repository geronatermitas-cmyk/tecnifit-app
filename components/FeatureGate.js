// components/FeatureGate.js
// @ts-nocheck
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/AuthStore';

/**
 * Muestra `children` solo si el usuario puede crear tareas (según su rol/limits).
 * Si no puede, enseña un bloque informativo y, opcionalmente, un botón “Ver opciones”.
 *
 * Props:
 * - needCreate: boolean -> si true, exige permiso de creación antes de renderizar children.
 * - onLocked: () => void -> callback al pulsar “Ver opciones” (p. ej., navegar a Upgrade/Planes).
 */
export default function FeatureGate({ children, needCreate = false, onLocked = null }) {
  // Hacemos la lectura de auth a prueba de null/undefined
  const auth = (typeof useAuth === 'function') ? useAuth() : null;

  // Permisos y límites con fallback seguros
  const canCreateTask =
    (auth && typeof auth.canCreateTask === 'boolean') ? auth.canCreateTask : true;

  const limits = auth?.limits ?? { maxTasksPerDay: 3 };

  // Si se requiere permiso de creación y no está permitido, mostramos aviso
  if (needCreate && !canCreateTask) {
    return (
      <View
        style={{
          padding: 14,
          borderRadius: 12,
          backgroundColor: '#FFF1F2',
          borderWidth: 1,
          borderColor: '#FCA5A5',
        }}
      >
        <Text style={{ color: '#B91C1C', fontWeight: '700', marginBottom: 6 }}>
          Límite alcanzado / Rol sin permisos
        </Text>

        <Text style={{ color: '#7f1d1d' }}>
          Tu rol actual no puede crear más tareas hoy (máx. {limits?.maxTasksPerDay ?? 0}). Sube de plan para continuar.
        </Text>

        {onLocked ? (
          <TouchableOpacity onPress={onLocked} style={{ marginTop: 10 }}>
            <Text style={{ color: '#2563EB', fontWeight: '700' }}>Ver opciones</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  // Si no hay restricción, render normal
  return <>{children}</>;
}
