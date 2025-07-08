// screens/Upload/FileUploadScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import DocumentCard from '../../components/upload/DocumentCard';
import CategoryFilter from '../../components/upload/CategoryFilter';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

// Sample uploaded documents/reports
const sampleDocuments = [
  {
    id: 1,
    name: 'Blood Test Report - CBC',
    type: 'Lab Report',
    uploadDate: '2024-12-15',
    size: '2.3 MB',
    fileType: 'PDF',
    category: 'laboratory',
    status: 'processed',
    thumbnail: '🩸',
    description: 'Complete Blood Count analysis'
  },
  {
    id: 2,
    name: 'Chest X-Ray Results',
    type: 'Imaging',
    uploadDate: '2024-12-10',
    size: '8.7 MB',
    fileType: 'DICOM',
    category: 'imaging',
    status: 'processed',
    thumbnail: '🫁',
    description: 'Chest radiograph examination'
  },
  {
    id: 3,
    name: 'Prescription - Dr. Smith',
    type: 'Prescription',
    uploadDate: '2024-12-08',
    size: '0.8 MB',
    fileType: 'PDF',
    category: 'prescription',
    status: 'processed',
    thumbnail: '💊',
    description: 'Medication prescription'
  },
  {
    id: 4,
    name: 'Vaccination Certificate',
    type: 'Certificate',
    uploadDate: '2024-12-05',
    size: '1.2 MB',
    fileType: 'PDF',
    category: 'vaccination',
    status: 'processed',
    thumbnail: '💉',
    description: 'COVID-19 vaccination record'
  },
  {
    id: 5,
    name: 'MRI Brain Scan',
    type: 'Imaging',
    uploadDate: '2024-12-01',
    size: '15.4 MB',
    fileType: 'DICOM',
    category: 'imaging',
    status: 'processing',
    thumbnail: '🧠',
    description: 'Brain MRI examination'
  },
  {
    id: 6,
    name: 'Discharge Summary',
    type: 'Hospital Record',
    uploadDate: '2024-11-28',
    size: '1.8 MB',
    fileType: 'PDF',
    category: 'other',
    status: 'processed',
    thumbnail: '🏥',
    description: 'Hospital discharge documentation'
  }
];

export default function FileUploadScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadedFiles, setUploadedFiles] = useState(sampleDocuments);
  const [loading, setLoading] = useState(false);

  const categories = ['all', 'laboratory', 'imaging', 'prescription', 'vaccination', 'other'];

  const filteredDocuments = selectedCategory === 'all' 
    ? uploadedFiles 
    : uploadedFiles.filter(doc => doc.category === selectedCategory);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ 
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true
      });
      
      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const newFile = {
          id: Date.now(),
          name: file.name,
          type: 'Document',
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileType: file.mimeType?.includes('pdf') ? 'PDF' : file.mimeType?.includes('image') ? 'Image' : 'Document',
          category: 'other',
          status: 'processing',
          thumbnail: '📄',
          description: 'Uploaded document'
        };
        
        setUploadedFiles(prev => [newFile, ...prev]);
        Alert.alert('Success', `${file.name} uploaded successfully!`);
        
        // Simulate processing completion
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? { ...f, status: 'processed' } : f)
          );
        }, 3000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document. Please try again.');
    }
  };

  const handleDownloadDocument = (document) => {
    Alert.alert('Download', `Downloading ${document.name}...`);
    console.log('Download document:', document.name);
  };

  const handleExportDocument = (document) => {
    Alert.alert(
      'Export Options',
      'Choose export format:',
      [
        { text: 'Original Format', onPress: () => console.log('Export original:', document.name) },
        { text: 'PDF Report', onPress: () => console.log('Export as PDF:', document.name) },
        { text: 'Image (JPG)', onPress: () => console.log('Export as image:', document.name) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleDeleteDocument = (documentId) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => setUploadedFiles(prev => prev.filter(doc => doc.id !== documentId))
        }
      ]
    );
  };

  const handleBulkExport = () => {
    Alert.alert(
      'Bulk Export',
      'Export all documents in selected category?',
      [
        { 
          text: 'Export All', 
          onPress: () => {
            const count = filteredDocuments.length;
            Alert.alert('Success', `${count} documents have been exported to your Downloads folder.`);
            console.log(`Bulk exported ${count} documents from category: ${selectedCategory}`);
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Document Manager"
        subtitle={`${filteredDocuments.length} documents in ${selectedCategory === 'all' ? 'all categories' : selectedCategory}`}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <MaterialIcons name="cloud-upload" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
        
        {filteredDocuments.length > 0 && (
          <TouchableOpacity style={styles.exportButton} onPress={handleBulkExport}>
            <MaterialIcons name="download" size={18} color="#007AFF" />
            <Text style={styles.exportButtonText}>Export All</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredDocuments.length === 0 ? (
        <EmptyState 
          title="No Documents Found"
          subtitle={selectedCategory === 'all' ? 'Upload your first document' : `No documents in ${selectedCategory} category`}
          icon="📄"
          actionText="Upload Document"
          onAction={pickDocument}
        />
      ) : (
        <ScrollView style={styles.documentsContainer}>
          {filteredDocuments.map(document => (
            <DocumentCard
              key={document.id}
              document={document}
              onDownload={() => handleDownloadDocument(document)}
              onExport={() => handleExportDocument(document)}
              onDelete={() => handleDeleteDocument(document.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  exportButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exportButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  documentsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
