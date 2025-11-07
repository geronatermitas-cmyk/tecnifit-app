// @ts-nocheck

import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../store/AuthStore';


export default function ProtectedScreen({ navigation, children }) {

  const { user } = useAuth();

  useEffect(() => {

    if (!user) navigation.replace('Login');

  }, [user, navigation]);

  if (!user) {

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>

        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 8 }}>Necesitas iniciar sesión</Text>

        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ padding: 12, backgroundColor: '#2563EB', borderRadius: 10 }}>

          <Text style={{ color: '#fff', fontWeight: '700' }}>Ir a Login</Text>

        </TouchableOpacity>

      </View>

    );

  }

  return children;

}
