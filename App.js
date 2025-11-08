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
import ProfileScreen from './screens/ProfileScreen';
import NavigationMenu from './components/NavigationMenu';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: true, headerRight: () => <NavigationMenu showProfile={false} /> }} />
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
        headerRight: () => <NavigationMenu showProfile={true} />,
      }}
    >
      <Stack.Screen name="Panel" component={PanelScreen} />
      <Stack.Screen name="TaskBuilder" component={TaskBuilderScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Plans" component={PlansScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // O un componente de carga (Splash Screen)
  }

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
