//6-10 23:38
// Updated for Vercel deployment

// @ts-nocheck

import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { AuthProvider, useAuth } from './store/AuthStore';
import { UIProvider } from './store/UIContext';

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


function AuthStack() {
	  return (
	    <Stack.Navigator screenOptions={{ headerShown: false }}>
	      <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'TecnicFit - Inicio' }} />
	      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'TecnicFit - Iniciar Sesión' }} />
	      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'TecnicFit - Crear Cuenta' }} />
	      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'TecnicFit - Recuperar' }} />
	    </Stack.Navigator>
	  );
	}
	
	function AppStack() {
	  return (
	    <Stack.Navigator
	      initialRouteName="Panel"
	      screenOptions={{
	        headerTitle: 'TecnicFit Pro',
	        headerStyle: { backgroundColor: '#2563EB' },
	        headerTintColor: '#fff',
	        headerTitleStyle: { fontWeight: '800' },
	        headerRight: ({ navigation }) => <MenuButton navigation={navigation} />,
	      }}
	    >
	      <Stack.Screen name="Panel" component={PanelScreen} options={{ title: 'TecnicFit - Panel' }} />
	      <Stack.Screen name="TaskBuilder" component={TaskBuilderScreen} options={{ title: 'TecnicFit - Generar Tarea' }} />
	      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'TecnicFit - Confirmar Plan' }} />
	      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'TecnicFit - Resultados', headerRight: ({ navigation }) => <MenuButton navigation={navigation} /> }} />
	      <Stack.Screen name="Plans" component={PlansScreen} options={{ title: 'TecnicFit - Planes' }} />
	      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'TecnicFit - Historial' }} />
	    </Stack.Navigator>
	  );
	}
	
	function RootNavigator() {
	  const { user } = useAuth();
	
	  return (
	    <Stack.Navigator screenOptions={{ headerShown: false }}>
	      {user ? (
	        <Stack.Screen name="AppStack" component={AppStack} />
	      ) : (
	        <Stack.Screen name="AuthStack" component={AuthStack} />
	      )}
	    </Stack.Navigator>
	  );
	}

return (



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

	<UIProvider>
	<RootNavigator />
	</UIProvider>

	</NavigationContainer>

</IntakeProvider>

</PlanProvider>

</AuthProvider>

</SafeAreaProvider>

</GestureHandlerRootView>

);

}
