import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HealthHistoryScreen from './screens/Health/HealthHistoryScreen';

import FileUploadScreen from './screens/Upload/FileUploadScreen';
import BookingScreen from './screens/Booking/BookingScreen'; // Ensure this is the correct path to your BookingScreen

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Health':
                  iconName = 'heart-outline'; break;
                case 'Upload':
                  iconName = 'cloud-upload-outline'; break;
                case 'Booking':
                  iconName = 'calendar-outline'; break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4caf50',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Health" component={HealthHistoryScreen} />
          <Tab.Screen name="Upload" component={FileUploadScreen} />
          <Tab.Screen name="Booking" component={BookingScreen} />          
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
