import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoadingState = ({ message = 'Loading...', showSpinner = true }) => {
  return (
    <View style={styles.container}>
      {showSpinner && (
        <View style={styles.spinnerContainer}>
          <MaterialIcons name="refresh" size={32} color="#2196F3" />
        </View>
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },
  spinnerContainer: {
    marginBottom: 16
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});

export default LoadingState;
