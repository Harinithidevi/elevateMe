import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';

// Enable screens for better performance
enableScreens();

import HealthNavigator from './screens/Health/HealthNavigator';
import FileUploadScreen from './screens/Upload/FileUploadScreen';
import BookingScreen from './screens/Booking/BookingScreen';

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
          <Tab.Screen name="Health" component={HealthNavigator} />
          <Tab.Screen name="Upload" component={FileUploadScreen} />
          <Tab.Screen name="Booking" component={BookingScreen} />          
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
