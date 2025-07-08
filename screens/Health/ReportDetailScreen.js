import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Import components
import Header from '../../components/common/Header';
import ReportDetailCard from '../../components/health/ReportDetailCard';

// Import PDF generation utilities
import { 
  generatePrescriptionHTML, 
  generateScanHTML, 
  generateBloodTestHTML, 
  generateDischargeHTML 
} from '../../utils/pdfGenerator';

export default function ReportDetailScreen({ route, navigation }) {
  const { report, reportType } = route.params;

  const getReportTitle = () => {
    switch (reportType) {
      case 'prescription':
        return 'Prescription Report';
      case 'scan':
        return 'Scan Report';
      case 'test':
      case 'bloodTest':
        return 'Test Report';
      case 'discharge':
        return 'Discharge Summary';
      default:
        return 'Medical Report';
    }
  };

  const generatePDF = async () => {
    let html = '';
    
    switch (reportType) {
      case 'prescription':
        html = generatePrescriptionHTML(report);
        break;
      case 'scan':
        html = generateScanHTML(report);
        break;
      case 'test':
      case 'bloodTest':
        html = generateBloodTestHTML(report);
        break;
      case 'discharge':
        html = generateDischargeHTML(report);
        break;
      default:
        Alert.alert('Error', 'Unknown report type');
        return;
    }

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
      } else {
        Alert.alert('Success', 'PDF generated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title={getReportTitle()}
        subtitle={`Date: ${report.date}`}
        showBackButton={true}
        onBack={() => navigation.goBack()}
        rightElement={
          <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
            <MaterialIcons name="picture-as-pdf" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />
      
      <ReportDetailCard 
        report={report} 
        type={reportType === 'bloodTest' ? 'test' : reportType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pdfButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
