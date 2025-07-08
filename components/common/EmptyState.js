import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmptyState = ({ 
  icon = 'inbox', 
  title = 'No data found', 
  message = 'There are no items to display', 
  actionText,
  onAction,
  customIcon
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {customIcon ? (
          <Text style={styles.customIcon}>{customIcon}</Text>
        ) : (
          <MaterialIcons name={icon} size={64} color="#ccc" />
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {actionText && onAction ? (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60
  },
  iconContainer: {
    marginBottom: 20
  },
  customIcon: {
    fontSize: 64,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8
  }
});

export default EmptyState;
