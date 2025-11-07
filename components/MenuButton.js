// @ts-nocheck

import React, { useState } from 'react';

import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import { Ionicons } from '@expo/vector-icons'; // Eliminado por problemas de compatibilidad

import { useAuth } from '../store/AuthStore';


export default function MenuButton({ navigation }) {

  // const navigation = useNavigation(); // Usamos el prop navigation de App.js

  const [open, setOpen] = useState(false);


  let auth = null;

  try { auth = typeof useAuth === 'function' ? useAuth() : null; } catch {}

  const user = auth?.user;

  const signOut = auth?.signOut;


  const goLogin = () => { setOpen(false); navigation.navigate('Login'); };

  const goSignup = () => { setOpen(false); navigation.navigate('Signup'); };

  const goPanel = () => { setOpen(false); navigation.navigate('Panel'); };

  const doLogout = () => {

    setOpen(false);

    if (typeof signOut === 'function') signOut();

    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });

  };


  return (

    <View style={{ marginRight: 8 }}>

      <Pressable

        onPress={() => {
          if (!user) {
            // Enviar señal a LandingScreen para abrir el AuthModal
            navigation.navigate('Landing', { openAuthModal: true });
          } else {
            setOpen(v => !v);
          }
        }}

        hitSlop={12}

        style={{ padding: 6 }}

      >

        <Text style={{ fontSize: 26, color: '#fff' }}>{user ? "👤" : "👤"}</Text>

      </Pressable>


      {open && user && (

        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>

        </Pressable>

      )}


      {open && user && (

        <View style={styles.menu}>

          {!user ? (

            <>

              <MenuItem label="Acceder" onPress={goLogin} />

              <MenuItem label="Crear cuenta" onPress={goSignup} />

            </>

          ) : (

            <>

              <MenuItem label="Mi cuenta" onPress={goPanel} />

              <MenuItem label="Cerrar sesión" onPress={doLogout} danger />

            </>

          )}

        </View>

      )}

    </View>

  );

}


function MenuItem({ label, onPress, danger }) {

  return (

    <TouchableOpacity onPress={onPress} style={styles.item}>

      <Text style={[styles.itemText, danger && { color: '#B91C1C' }]}>{label}</Text>

    </TouchableOpacity>

  );

}


const styles = StyleSheet.create({

  menu: {

    position: 'absolute',

    top: 34,

    right: 0,

    backgroundColor: '#fff',

    borderRadius: 12,

    paddingVertical: 6,

    minWidth: 180,

    shadowColor: '#000',

    shadowOpacity: 0.15,

    shadowRadius: 12,

    shadowOffset: { width: 0, height: 6 },

    elevation: 6,

    borderWidth: 1,

    borderColor: '#E5E7EB',

  },

  item: {

    paddingVertical: 10,

    paddingHorizontal: 14,

  },

  itemText: {

    fontSize: 16,

    fontWeight: '700',

    color: '#0F172A',

  },

});

