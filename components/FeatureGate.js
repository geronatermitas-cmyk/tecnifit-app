// @ts-nocheck

import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../store/AuthStore';

import { usePlan } from '../store/PlanStore';


export default function FeatureGate({ children, needCreate = false, onLocked = null, message }) {

  let auth = null;

  try { auth = useAuth(); } catch {}

  let plan = null;

  try { plan = usePlan(); } catch {}


  const user = auth?.user ?? null;

  const limits = auth?.limits ?? { maxTasksPerDay: 3 };

  const usedToday = auth?.usedToday ?? 0;


  const isFree = plan?.isFree ?? true;

  const isPro = plan?.isPro ?? false;

  const isColab = plan?.isColab ?? false;


  let blockedReason = null;

  if (needCreate) {

    if (!user) blockedReason = 'Necesitas iniciar sesión para continuar.';

    else if (isFree && !isPro && !isColab) blockedReason = 'El plan FREE no permite crear tareas.';

    else if (usedToday >= (limits?.maxTasksPerDay ?? 0)) blockedReason = `Has alcanzado el máximo diario (${limits?.maxTasksPerDay ?? 0}).`;

  }


  if (blockedReason) {

    return (

      <View

        style={{

          padding: 12,

          borderRadius: 12,

          backgroundColor: '#FFF1F2',

          borderWidth: 1,

          borderColor: '#FCA5A5',

        }}

      >

        <Text style={{ color: '#B91C1C', fontWeight: '800', marginBottom: 6 }}>

          {message || 'Acción no disponible'}

        </Text>

        <Text style={{ color: '#7f1d1d' }}>{blockedReason}</Text>


        {onLocked ? (

          <TouchableOpacity onPress={onLocked} style={{ marginTop: 10 }}>

            <Text style={{ color: '#2563EB', fontWeight: '800' }}>Ver opciones</Text>

          </TouchableOpacity>

        ) : null}

      </View>

    );

  }


  return <>{children}</>;

}
