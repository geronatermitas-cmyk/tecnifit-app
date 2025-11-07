// @ts-nocheck

import React, { useState, useMemo } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';


export default function LandingScreen() {

  const navigation = useNavigation();

  const { user } = useAuth();

  const [q, setQ] = useState('');


  const onSearch = () => {

    navigation.navigate('Results', { q: q?.trim() || '' });

  };


  const buttons = useMemo(() => {

    const arr = [

      {

        key: 'buscar',

        label: 'Buscar',

        primary: false,

        onPress: onSearch,

      },

      ...(user ? [{

        key: 'planes',

        label: 'Planes',

        primary: false,

        onPress: () => navigation.navigate('Plans'),

      }] : []),

      ...(user ? [{

        key: 'panel',

        label: 'Panel',

        primary: true,

        onPress: () => navigation.navigate('Panel'),

      }] : [{

        key: 'login',

        label: 'Iniciar sesión',

        primary: true,

        onPress: () => navigation.navigate('Login'),

      }]),

    ];

    return arr;

  }, [user, q]);


  return (

    <KeyboardAvoidingView

      style={{ flex: 1 }}

      behavior={Platform.OS === 'ios' ? 'padding' : undefined}

    >

      <View style={styles.bg}>

        <View style={styles.searchBoxWrap}>

          <Text style={styles.title}>ASISTENTE DIGITAL DE TAREAS</Text>

          <Text style={styles.subtitle}>GUÍA. APRENDE. HAZ.</Text>


          <TextInput

            value={q}

            onChangeText={setQ}

            placeholder="Describe tu tarea..."

            placeholderTextColor="#94A3B8"

            style={styles.input}

            returnKeyType="search"

            onSubmitEditing={onSearch}

          />


          <View style={styles.buttonsWrap}>

            {buttons.map(b => (

              <TouchableOpacity

                key={b.key}

                onPress={b.onPress}

                style={[

                  styles.btnBase,

                  b.primary ? styles.btnPrimary : styles.btnGhost,

                ]}

              >

                <Text style={[styles.btnText, b.primary && { color: '#fff' }]}>

                  {b.label}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

      </View>

    </KeyboardAvoidingView>

  );

}


const styles = StyleSheet.create({

  bg: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },

  searchBoxWrap: {

    width: '90%', maxWidth: 560, backgroundColor: '#fff',

    borderRadius: 18, padding: 16,

  },

  title: { color: '#1E3A8A', fontSize: 18, fontWeight: '900', textAlign: 'center' },

  subtitle: { color: '#1E40AF', textAlign: 'center', marginBottom: 16 },

  input: {

    backgroundColor: '#fff', borderColor: '#E2E8F0', borderWidth: 1,

    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14, fontSize: 16,

    marginBottom: 12,

  },

  buttonsWrap: {

    flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between',

  },

  btnBase: {

    flexGrow: 1, flexBasis: '48%', paddingVertical: 14, borderRadius: 14, alignItems: 'center',

  },

  btnGhost: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1' },

  btnPrimary: { backgroundColor: '#2563EB' },

  btnText: { fontWeight: '800', color: '#0F172A' },

});
