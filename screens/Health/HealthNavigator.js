import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HealthMainScreen from './HealthMainScreen';
import ReportDetailScreen from './ReportDetailScreen';

const Stack = createStackNavigator();

export default function HealthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HealthMain" 
        component={HealthMainScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ReportDetail" 
        component={ReportDetailScreen} 
        options={{ title: 'Report Details' }}
      />
    </Stack.Navigator>
  );
}
