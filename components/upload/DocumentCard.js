import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * DocumentCard Component
 * 
 * A card component for displaying document information.
 * 
 * @param {Object} document - Document object with fileType, category, name, size, etc.
 * @param {Function} onDownload - Callback function for downloading documents
 * @param {Function} onView - Callback function for viewing documents
 * @param {Function} onDelete - Callback function for deleting documents
 * @param {Function} onExport - Callback function for exporting documents
 */
const DocumentCard = ({ 
  document = {}, 
  onDownload = () => {}, 
  onView = () => {}, 
  onDelete = () => {}, 
  onExport = () => {} 
}) => {
  const getFileTypeIcon = () => {
    if (!document || !document.fileType) return '📋';
    
    switch (document.fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'dicom': return '🏥';
      case 'doc':
      case 'docx': return '📝';
      default: return '📋';
    }
  };

  const getCategoryColor = () => {
    if (!document || !document.category) return '#9E9E9E';
    
    switch (document.category) {
      case 'laboratory': return '#4CAF50';
      case 'imaging': return '#2196F3';
      case 'prescription': return '#FF9800';
      case 'vaccination': return '#9C27B0';
      case 'report': return '#607D8B';
      default: return '#9E9E9E';
    }
  };

  const getStatusColor = () => {
    switch (document.status) {
      case 'processed': return '#4CAF50';
      case 'processing': return '#FF9800';
      case 'failed': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const formatFileSize = (sizeStr) => {
    // Simple file size formatting
    return sizeStr;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.fileInfo}>
          <Text style={styles.fileIcon}>{document.thumbnail || getFileTypeIcon()}</Text>
          <View style={styles.nameSection}>
            <Text style={styles.fileName} numberOfLines={2}>{document.name}</Text>
            <Text style={styles.fileType}>{document.type}</Text>
          </View>
        </View>
        <View style={styles.statusSection}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {document.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        {document.description && (
          <Text style={styles.description}>{document.description}</Text>
        )}
        
        <View style={styles.metadataRow}>
          <View style={styles.metadataItem}>
            <MaterialIcons name="calendar-today" size={14} color="#666" />
            <Text style={styles.metadataText}>
              {formatDate(document.uploadDate)}
            </Text>
          </View>
          
          <View style={styles.metadataItem}>
            <MaterialIcons name="storage" size={14} color="#666" />
            <Text style={styles.metadataText}>
              {formatFileSize(document.size)}
            </Text>
          </View>
          
          <View style={styles.metadataItem}>
            <MaterialIcons name="description" size={14} color="#666" />
            <Text style={styles.metadataText}>
              {document.fileType}
            </Text>
          </View>
        </View>
        
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() }]}>
          <Text style={styles.categoryText}>
            {document.category?.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onView}>
          <MaterialIcons name="visibility" size={16} color="#2196F3" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onDownload}>
          <MaterialIcons name="download" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onExport}>
          <MaterialIcons name="share" size={16} color="#FF9800" />
          <Text style={styles.actionText}>Export</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <MaterialIcons name="delete" size={16} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12
  },
  fileIcon: {
    fontSize: 24,
    marginRight: 12
  },
  nameSection: {
    flex: 1
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    lineHeight: 20
  },
  fileType: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  cardContent: {
    marginBottom: 16
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  metadataText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500'
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  categoryText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    marginRight: 6
  },
  actionText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500'
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffcdd2'
  }
});

export default DocumentCard;
