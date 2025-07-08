import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * ReportDetailCard Component
 * 
 * A detailed card component for displaying various types of medical reports with comprehensive information.
 * 
 * @param {Object} report - Report object containing all report details (default: empty object)
 * @param {string} type - Type of report ('prescription', 'scan', 'test', etc.) (default: 'general')
 */
const ReportDetailCard = ({ report = {}, type = 'general' }) => {
  const renderPrescriptionDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💊 Prescription Details</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Disease:</Text>
        <Text style={styles.value}>{report.disease || 'Not specified'}</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Prescribed Medicines</Text>
      {Array.isArray(report.medicines) && report.medicines.length > 0 ? (
        report.medicines.map((medicine, index) => (
          <View key={index} style={styles.medicineCard}>
            <Text style={styles.medicineName}>{medicine?.name || 'Unknown Medicine'}</Text>
            <Text style={styles.medicineDetails}>
              {medicine?.dosage || 'N/A'} • {medicine?.frequency || 'N/A'} • {medicine?.duration || 'N/A'}
            </Text>
            <Text style={styles.instructions}>{medicine?.instructions || 'No instructions provided'}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.value}>No medicines prescribed</Text>
      )}
      
      {report.surgery && (
        <View style={styles.surgerySection}>
          <Text style={styles.subsectionTitle}>Surgery Information</Text>
          <Text style={styles.surgeryName}>{report.surgery.name || 'Surgery name not specified'}</Text>
          <Text style={styles.surgeryDate}>Date: {report.surgery.date || 'Date not specified'}</Text>
          <Text style={styles.surgeryOutcome}>Outcome: {report.surgery.outcome || 'Outcome not specified'}</Text>
        </View>
      )}
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Next Visit:</Text>
        <Text style={styles.value}>{report.nextVisit || 'Not scheduled'}</Text>
      </View>
      
      <View style={styles.notesSection}>
        <Text style={styles.subsectionTitle}>Doctor's Notes</Text>
        <Text style={styles.notes}>{report.prescription?.notes || 'No notes available'}</Text>
      </View>
    </View>
  );

  const renderScanDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🏥 Scan Report Details</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Scan Type:</Text>
        <Text style={styles.value}>{report.type || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Body Part:</Text>
        <Text style={styles.value}>{report.bodyPart || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Equipment:</Text>
        <Text style={styles.value}>{report.equipment || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Technician:</Text>
        <Text style={styles.value}>{report.technician || 'Not specified'}</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Results</Text>
      <Text style={styles.result}>{report.result || 'Results not available'}</Text>
      
      {Array.isArray(report.findings) && report.findings.length > 0 && (
        <View style={styles.findingsSection}>
          <Text style={styles.subsectionTitle}>Key Findings</Text>
          {report.findings.map((finding, index) => (
            <View key={index} style={styles.findingItem}>
              <MaterialIcons name="fiber-manual-record" size={6} color="#666" />
              <Text style={styles.findingText}>{finding}</Text>
            </View>
          ))}
        </View>
      )}
      
      {Array.isArray(report.recommendations) && report.recommendations.length > 0 && (
        <View style={styles.recommendationsSection}>
          <Text style={styles.subsectionTitle}>Recommendations</Text>
          {report.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <MaterialIcons name="arrow-forward" size={16} color="#4CAF50" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderTestDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🧪 Test Report Details</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Test Type:</Text>
        <Text style={styles.value}>{report.testType || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Sample Type:</Text>
        <Text style={styles.value}>{report.sampleType || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Lab:</Text>
        <Text style={styles.value}>{report.lab || 'Not specified'}</Text>
      </View>
      
      <Text style={styles.subsectionTitle}>Test Results</Text>
      {Array.isArray(report.results) && report.results.length > 0 ? (
        report.results.map((result, index) => (
          <View key={index} style={styles.testResultCard}>
            <View style={styles.testResultHeader}>
              <Text style={styles.testName}>{result?.name || 'Unknown Test'}</Text>
              <Text style={[
                styles.testStatus, 
                { color: result?.status === 'Normal' ? '#4CAF50' : 
                        result?.status === 'High' ? '#F44336' : 
                        result?.status === 'Low' ? '#FF9800' : '#666' }
              ]}>
                {result?.status || 'Unknown'}
              </Text>
            </View>
            <Text style={styles.testValue}>{result?.value || 'N/A'} {result?.unit || ''}</Text>
            <Text style={styles.testRange}>Normal: {result?.normalRange || 'Not specified'}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.value}>No test results available</Text>
      )}
      
      {report.summary && (
        <View style={styles.summarySection}>
          <Text style={styles.subsectionTitle}>Summary</Text>
          <Text style={styles.summary}>{report.summary}</Text>
        </View>
      )}
    </View>
  );

  const renderDoctorInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👨‍⚕️ Healthcare Provider</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{report.doctor || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>License:</Text>
        <Text style={styles.value}>{report.doctorLicense || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Hospital:</Text>
        <Text style={styles.value}>{report.hospital || 'Not specified'}</Text>
      </View>
      <Text style={styles.address}>{report.hospitalAddress || 'Address not provided'}</Text>
    </View>
  );

  const renderPatientInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👤 Patient Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{report.patientName || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{report.patientAge ? `${report.patientAge} years` : 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{report.patientGender || 'Not specified'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Report Date:</Text>
        <Text style={styles.value}>{report.date || 'Not specified'}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderPatientInfo()}
      {type === 'prescription' && renderPrescriptionDetails()}
      {type === 'scan' && renderScanDetails()}
      {type === 'test' && renderTestDetails()}
      {renderDoctorInfo()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  section: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginTop: 16,
    marginBottom: 8
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right'
  },
  address: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4
  },
  medicineCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  medicineDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  instructions: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic'
  },
  surgerySection: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  surgeryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  surgeryDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  surgeryOutcome: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 4
  },
  notesSection: {
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 12
  },
  notes: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20
  },
  result: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    lineHeight: 20
  },
  findingsSection: {
    marginTop: 12
  },
  findingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 8
  },
  findingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1
  },
  recommendationsSection: {
    marginTop: 12
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f0f8f0',
    padding: 8,
    borderRadius: 6
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1
  },
  testResultCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3'
  },
  testResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  testStatus: {
    fontSize: 12,
    fontWeight: '600'
  },
  testValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  testRange: {
    fontSize: 12,
    color: '#666'
  },
  summarySection: {
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 12
  },
  summary: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20
  }
});

export default ReportDetailCard;
