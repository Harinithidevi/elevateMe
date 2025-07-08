import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * UploadArea Component
 * 
 * A comprehensive upload area component with support for file selection, camera, and scanning options.
 * 
 * @param {Function} onUpload - Callback function called when upload is initiated (default: no-op function)
 * @param {boolean} isUploading - Whether an upload is currently in progress (default: false)
 */
const UploadArea = ({ onUpload = () => {}, isUploading = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.uploadArea, isUploading && styles.uploadingArea]}
        onPress={onUpload}
        disabled={isUploading}
      >
        <View style={styles.uploadContent}>
          {isUploading ? (
            <>
              <MaterialIcons name="cloud-upload" size={48} color="#2196F3" />
              <Text style={styles.uploadingText}>Uploading...</Text>
              <Text style={styles.uploadingSubtext}>Please wait while we process your file</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="cloud-upload" size={48} color="#666" />
              <Text style={styles.uploadText}>Upload Document</Text>
              <Text style={styles.uploadSubtext}>
                Tap to select files from your device
              </Text>
              <View style={styles.supportedFormats}>
                <Text style={styles.formatsTitle}>Supported formats:</Text>
                <Text style={styles.formatsText}>
                  PDF, JPG, PNG, DICOM, DOC, DOCX
                </Text>
              </View>
            </>
          )}
        </View>
        
        {!isUploading && (
          <View style={styles.uploadButton}>
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Choose File</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {!isUploading && (
        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="camera-alt" size={20} color="#4CAF50" />
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="scanner" size={20} color="#FF9800" />
            <Text style={styles.optionText}>Scan Document</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.uploadTips}>
        <Text style={styles.tipsTitle}>📋 Upload Tips:</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <MaterialIcons name="check-circle" size={14} color="#4CAF50" />
            <Text style={styles.tipText}>Ensure documents are clear and readable</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialIcons name="check-circle" size={14} color="#4CAF50" />
            <Text style={styles.tipText}>Maximum file size: 10MB</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialIcons name="check-circle" size={14} color="#4CAF50" />
            <Text style={styles.tipText}>Remove any personal identifiers if needed</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  uploadArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  uploadingArea: {
    borderColor: '#2196F3',
    backgroundColor: '#f0f8ff'
  },
  uploadContent: {
    alignItems: 'center',
    marginBottom: 20
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8
  },
  uploadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    marginTop: 12,
    marginBottom: 8
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  uploadingSubtext: {
    fontSize: 14,
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 16
  },
  supportedFormats: {
    alignItems: 'center'
  },
  formatsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  formatsText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center'
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  optionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 6
  },
  uploadTips: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  tipsList: {
    marginLeft: 8
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16
  }
});

export default UploadArea;
