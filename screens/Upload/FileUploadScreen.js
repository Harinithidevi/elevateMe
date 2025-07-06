// screens/FileUploadScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function FileUploadScreen() {
  const [fileName, setFileName] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setFileName(result.assets[0].name);
        Alert.alert('File Selected', result.assets[0].name);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="cloud-upload" size={60} color="#4F8EF7" style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Upload Health Documents</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <MaterialIcons name="attach-file" size={24} color="#fff" />
        <Text style={styles.uploadButtonText}>Select Document</Text>
      </TouchableOpacity>
      {fileName && (
        <View style={styles.fileInfo}>
          <MaterialIcons name="insert-drive-file" size={20} color="green" />
          <Text style={styles.fileName}>Selected: {fileName}</Text>
        </View>
      )}
    </View>
  );
}

// Add these styles below your existing styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F7FAFC' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F8EF7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 10,
    elevation: 2,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#E6F4EA',
    padding: 10,
    borderRadius: 8,
  },
  fileName: { marginLeft: 8, fontSize: 16, color: 'green', fontWeight: '500' },
});

