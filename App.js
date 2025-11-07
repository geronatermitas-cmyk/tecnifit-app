//6-10 23:38

// @ts-nocheck

import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { AuthProvider } from './store/AuthStore';

import { IntakeProvider } from './store/IntakeStore';

import { PlanProvider } from './store/PlanStore';

import { SafeAreaProvider } from 'react-native-safe-area-context';


import LandingScreen from './screens/LandingScreen';

import LoginScreen from './screens/LoginScreen';

import SignupScreen from './screens/SignupScreen';

import PanelScreen from './screens/PanelScreen';

import ResultsScreen from './screens/ResultsScreen';

import PlansScreen from './screens/PlansScreen';

import HistoryScreen from './screens/HistoryScreen';

import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import TaskBuilderScreen from './screens/TaskBuilderScreen';

import CheckoutScreen from './screens/CheckoutScreen';


import MenuButton from './components/MenuButton';


const Stack = createNativeStackNavigator();


function RootNavigator() {

return (

<Stack.Navigator

screenOptions={{

headerTitle: 'TecnicFit',

headerStyle: { backgroundColor: '#2563EB' },

headerTintColor: '#fff',

headerTitleStyle: { fontWeight: '800' },

headerRight: () => <MenuButton />, // ← tres puntos en TODAS

}}

>

<Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: true }} />

<Stack.Screen name="Login" component={LoginScreen} />

<Stack.Screen name="Signup" component={SignupScreen} />

<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar' }} />


{/* RUTAS CON SESIÓN */}

<Stack.Screen name="Panel" component={PanelScreen} />

<Stack.Screen name="TaskBuilder" component={TaskBuilderScreen} options={{ title: 'Generar tarea' }} />

<Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Confirmar plan' }} />

{/* COMUNES */}

<Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Resultados' }} />

<Stack.Screen name="Plans" component={PlansScreen} options={{ title: 'Planes' }} />

<Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />

</Stack.Navigator>

);

}


export default function App() {

return (

<GestureHandlerRootView style={{ flex: 1 }}>

<SafeAreaProvider>

<AuthProvider>

<PlanProvider>

<IntakeProvider>

<NavigationContainer>

<RootNavigator />

</NavigationContainer>

</IntakeProvider>

</PlanProvider>

</AuthProvider>

</SafeAreaProvider>

</GestureHandlerRootView>

);

}
