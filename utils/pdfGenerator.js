// utils/pdfGenerator.js
// PDF generation utilities for medical reports

export const generatePrescriptionHTML = (report) => {
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
          .signature { 
            text-align: right; 
            margin-top: 40px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hospital-name">${report.prescription.hospital}</div>
          <div class="hospital-address">${report.prescription.hospitalAddress}</div>
        </div>
        
        <div class="prescription-title">MEDICAL PRESCRIPTION</div>
        
        <div class="patient-info">
          <strong>Patient Information:</strong><br>
          Name: ${report.patientName}<br>
          Age: ${report.patientAge} years<br>
          Gender: ${report.patientGender}<br>
          Date: ${report.date}
        </div>
        
        <div class="doctor-info">
          <strong>Dr. ${report.prescription.doctor}</strong><br>
          License No: ${report.prescription.doctorLicense}
        </div>
        
        <p><strong>Diagnosis:</strong> ${report.disease}</p>
        
        <p><strong>Medications Prescribed:</strong></p>
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
            ${report.medicines.map(med => `
              <tr>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.frequency}</td>
                <td>${med.duration}</td>
                <td>${med.instructions}</td>
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

export const generateScanHTML = (report) => {
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

export const generateBloodTestHTML = (report) => {
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
        
        <div class="info-section">
          <strong>Test Information:</strong><br>
          Test Type: ${report.testType}<br>
          Ordering Physician: Dr. ${report.doctor}<br>
          Lab Technician: ${report.labTechnician}
        </div>
        
        <table class="results-table">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Result</th>
              <th>Unit</th>
              <th>Normal Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${report.tests.map(test => `
              <tr>
                <td style="text-align: left;">${test.name}</td>
                <td>${test.result}</td>
                <td>${test.unit}</td>
                <td>${test.normalRange}</td>
                <td class="${test.status.toLowerCase() === 'normal' ? 'normal' : 'abnormal'}">${test.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="info-section">
          <strong>Clinical Notes:</strong><br>
          ${report.notes}
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
          Laboratory Director
        </div>
      </body>
    </html>
  `;
};

export const generateDischargeHTML = (report) => {
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
            margin: 15px 0; 
          }
          .medications-table th, .medications-table td { 
            border: 1px solid #000; 
            padding: 8px; 
            text-align: left; 
          }
          .medications-table th { 
            background: #f0f0f0; 
            font-weight: bold; 
          }
          .instructions { 
            background: #fff3cd; 
            padding: 15px; 
            border-left: 4px solid #ffc107; 
            margin: 15px 0; 
          }
          .emergency { 
            background: #f8d7da; 
            padding: 15px; 
            border-left: 4px solid #dc3545; 
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
          Discharge Date: ${report.dischargeDate}
        </div>
        
        <div class="info-section">
          <strong>Attending Physician:</strong><br>
          Dr. ${report.attendingDoctor}<br>
          License: ${report.doctorLicense}
        </div>
        
        <div class="info-section">
          <strong>Primary Diagnosis:</strong><br>
          ${report.diagnosis}
        </div>
        
        <div class="info-section">
          <strong>Procedure(s) Performed:</strong><br>
          ${report.procedure}
        </div>
        
        <div class="info-section">
          <strong>Hospital Course & Summary:</strong><br>
          ${report.summary}
        </div>
        
        <div class="info-section">
          <strong>Discharge Medications:</strong>
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
              ${report.medications.map(med => `
                <tr>
                  <td>${med.name}</td>
                  <td>${med.dosage}</td>
                  <td>${med.frequency}</td>
                  <td>${med.duration}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="instructions">
          <strong>Discharge Instructions:</strong>
          <ul>
            ${report.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
          </ul>
        </div>
        
        <div class="info-section">
          <strong>Follow-up Appointment:</strong><br>
          Scheduled for: ${report.followUp}
        </div>
        
        <div class="emergency">
          <strong>Emergency Instructions:</strong><br>
          ${report.emergencyContact}
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
