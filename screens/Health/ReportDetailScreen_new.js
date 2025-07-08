import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Import components
import Header from '../../components/common/Header';
import ReportDetailCard from '../../components/health/ReportDetailCard';

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

const generatePrescriptionHTML = (report) => {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Medical Prescription</title>
        <style>
          body { 
            font-family: 'Times New Roman', serif; 
            padding: 40px; 
            line-height: 1.6; 
            color: #000;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #000; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .hospital-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c5aa0; 
            margin-bottom: 5px; 
          }
          .hospital-address { 
            font-size: 14px; 
            color: #666; 
          }
          .prescription-title { 
            font-size: 20px; 
            font-weight: bold; 
            text-align: center; 
            margin: 20px 0; 
            text-decoration: underline; 
          }
          .patient-info { 
            background: #f8f9fa; 
            padding: 15px; 
            border: 1px solid #ddd; 
            margin: 20px 0; 
          }
          .doctor-info { 
            text-align: right; 
            margin: 20px 0; 
          }
          .medicines-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }
          .medicines-table th, .medicines-table td { 
            border: 1px solid #000; 
            padding: 10px; 
            text-align: left; 
          }
          .medicines-table th { 
            background: #f0f0f0; 
            font-weight: bold; 
          }
          .footer { 
            margin-top: 40px; 
            border-top: 1px solid #000; 
            padding-top: 20px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-name">${report.prescription.hospital}</div>
          <div class="hospital-address">${report.prescription.hospitalAddress}</div>
          <div class="prescription-title">MEDICAL PRESCRIPTION</div>
        </div>
        
        <div class="patient-info">
          <strong>Patient Information:</strong><br>
          Name: ${report.patientName}<br>
          Age: ${report.patientAge} years<br>
          Gender: ${report.patientGender}<br>
          Date: ${report.date}
        </div>
        
        <div class="doctor-info">
          <strong>Prescribed by:</strong><br>
          Dr. ${report.prescription.doctor}<br>
          License: ${report.prescription.doctorLicense}
        </div>
        
        <table class="medicines-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            ${report.prescription.medicines.map(medicine => `
              <tr>
                <td>${medicine.name}</td>
                <td>${medicine.dosage}</td>
                <td>${medicine.frequency}</td>
                <td>${medicine.duration}</td>
                <td>${medicine.instructions}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        ${report.surgery ? `
          <p><strong>Surgery Information:</strong></p>
          <ul>
            <li>Procedure: ${report.surgery.name}</li>
            <li>Date: ${report.surgery.date}</li>
            <li>Outcome: ${report.surgery.outcome}</li>
          </ul>
        ` : ''}
        
        <p><strong>Doctor's Notes:</strong><br>
        ${report.prescription.notes}</p>
        
        <p><strong>Next Visit:</strong> ${report.nextVisit}</p>
        
        <div class="footer">
          <div class="signature">
            <br><br>
            _________________________<br>
            Dr. ${report.prescription.doctor}<br>
            ${report.prescription.doctorLicense}
          </div>
        </div>
      </body>
    </html>
  `;
};

const generateScanHTML = (report) => {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Radiology Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            line-height: 1.6; 
            color: #000;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #000; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .hospital-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c5aa0; 
          }
          .report-title { 
            font-size: 20px; 
            font-weight: bold; 
            text-align: center; 
            margin: 20px 0; 
            text-decoration: underline; 
          }
          .info-section { 
            background: #f8f9fa; 
            padding: 15px; 
            border: 1px solid #ddd; 
            margin: 15px 0; 
          }
          .findings-list { 
            background: #fff3cd; 
            padding: 15px; 
            border-left: 4px solid #ffc107; 
            margin: 15px 0; 
          }
          .recommendations { 
            background: #d1ecf1; 
            padding: 15px; 
            border-left: 4px solid #17a2b8; 
            margin: 15px 0; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-name">${report.hospital}</div>
          <div>${report.hospitalAddress}</div>
          <div class="report-title">RADIOLOGY REPORT</div>
        </div>
        
        <div class="info-section">
          <strong>Patient Information:</strong><br>
          Name: ${report.patientName}<br>
          Age: ${report.patientAge} years<br>
          Gender: ${report.patientGender}<br>
          Date of Examination: ${report.date}
        </div>
        
        <div class="info-section">
          <strong>Examination Details:</strong><br>
          Type: ${report.type}<br>
          Body Part: ${report.bodyPart}<br>
          Equipment: ${report.equipment}<br>
          Technician: ${report.technician}
        </div>
        
        <div class="findings-list">
          <strong>Findings:</strong>
          <ul>
            ${report.findings.map(finding => `<li>${finding}</li>`).join('')}
          </ul>
        </div>
        
        <div class="info-section">
          <strong>Impression:</strong><br>
          ${report.result}
        </div>
        
        <div class="recommendations">
          <strong>Recommendations:</strong>
          <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 40px; text-align: right;">
          <br><br>
          _________________________<br>
          Dr. ${report.doctor}<br>
          License: ${report.doctorLicense}<br>
          Radiologist
        </div>
      </body>
    </html>
  `;
};

const generateBloodTestHTML = (report) => {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Laboratory Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            line-height: 1.6; 
            color: #000;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #000; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .hospital-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c5aa0; 
          }
          .report-title { 
            font-size: 20px; 
            font-weight: bold; 
            text-align: center; 
            margin: 20px 0; 
            text-decoration: underline; 
          }
          .info-section { 
            background: #f8f9fa; 
            padding: 15px; 
            border: 1px solid #ddd; 
            margin: 15px 0; 
          }
          .results-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }
          .results-table th, .results-table td { 
            border: 1px solid #000; 
            padding: 10px; 
            text-align: center; 
          }
          .results-table th { 
            background: #f0f0f0; 
            font-weight: bold; 
          }
          .normal { color: #28a745; font-weight: bold; }
          .abnormal { color: #dc3545; font-weight: bold; }
          .recommendations { 
            background: #d1ecf1; 
            padding: 15px; 
            border-left: 4px solid #17a2b8; 
            margin: 15px 0; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-name">${report.hospital}</div>
          <div>${report.hospitalAddress}</div>
          <div class="report-title">LABORATORY REPORT</div>
        </div>
        
        <div class="info-section">
          <strong>Patient Information:</strong><br>
          Name: ${report.patientName}<br>
          Age: ${report.patientAge} years<br>
          Gender: ${report.patientGender}<br>
          Date of Collection: ${report.date}
        </div>
        
        <table class="results-table">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Reference Range</th>
              <th>Unit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${report.tests.map(test => `
              <tr>
                <td>${test.name}</td>
                <td>${test.value}</td>
                <td>${test.referenceRange}</td>
                <td>${test.unit}</td>
                <td class="${test.status === 'Normal' ? 'normal' : 'abnormal'}">${test.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="recommendations">
          <strong>Recommendations:</strong>
          <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 40px; text-align: right;">
          <br><br>
          _________________________<br>
          Dr. ${report.doctor}<br>
          License: ${report.doctorLicense}<br>
          Pathologist
        </div>
      </body>
    </html>
  `;
};

const generateDischargeHTML = (report) => {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Discharge Summary</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            line-height: 1.6; 
            color: #000;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #000; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .hospital-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c5aa0; 
          }
          .report-title { 
            font-size: 20px; 
            font-weight: bold; 
            text-align: center; 
            margin: 20px 0; 
            text-decoration: underline; 
          }
          .info-section { 
            background: #f8f9fa; 
            padding: 15px; 
            border: 1px solid #ddd; 
            margin: 15px 0; 
          }
          .medications-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }
          .medications-table th, .medications-table td { 
            border: 1px solid #000; 
            padding: 10px; 
            text-align: left; 
          }
          .medications-table th { 
            background: #f0f0f0; 
            font-weight: bold; 
          }
          .instructions { 
            background: #e7f3ff; 
            padding: 15px; 
            border-left: 4px solid #007bff; 
            margin: 15px 0; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-name">${report.hospital}</div>
          <div>${report.hospitalAddress}</div>
          <div class="report-title">DISCHARGE SUMMARY</div>
        </div>
        
        <div class="info-section">
          <strong>Patient Information:</strong><br>
          Name: ${report.patientName}<br>
          Age: ${report.patientAge} years<br>
          Gender: ${report.patientGender}<br>
          Admission Date: ${report.admissionDate}<br>
          Discharge Date: ${report.date}
        </div>
        
        <div class="info-section">
          <strong>Diagnosis:</strong><br>
          Primary: ${report.primaryDiagnosis}<br>
          Secondary: ${report.secondaryDiagnosis}
        </div>
        
        ${report.surgery ? `
          <div class="info-section">
            <strong>Surgery Information:</strong><br>
            Procedure: ${report.surgery.name}<br>
            Date: ${report.surgery.date}<br>
            Outcome: ${report.surgery.outcome}
          </div>
        ` : ''}
        
        <div class="info-section">
          <strong>Treatment Summary:</strong><br>
          ${report.treatmentSummary}
        </div>
        
        <table class="medications-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            ${report.dischargeMedications.map(med => `
              <tr>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.frequency}</td>
                <td>${med.duration}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="instructions">
          <strong>Follow-up Instructions:</strong>
          <ul>
            ${report.followUpInstructions.map(instruction => `<li>${instruction}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 40px; text-align: right;">
          <br><br>
          _________________________<br>
          Dr. ${report.attendingDoctor}<br>
          License: ${report.doctorLicense}<br>
          Attending Physician
        </div>
      </body>
    </html>
  `;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pdfButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
