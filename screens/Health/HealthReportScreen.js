import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import ReportCard from '../../components/health/ReportCard';
import EmptyState from '../../components/common/EmptyState';

// Sample data for each report type
const prescriptionReports = [
  {
    id: '1',
    date: "2024-06-10",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    prescription: {
      doctor: "Dr. Sarah Smith",
      doctorLicense: "MD12345",
      hospital: "City General Hospital",
      hospitalAddress: "123 Medical Center Dr, Healthcare City, HC 12345",
      notes: "Continue medication as prescribed. Follow up in 1 month. Monitor blood pressure daily."
    },
    disease: "Hypertension",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days", instructions: "Take with food" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days", instructions: "Take after meals" }
    ],
    surgery: null,
    nextVisit: "2024-07-10"
  },
  {
    id: '2',
    date: "2024-05-15",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    prescription: {
      doctor: "Dr. Michael Johnson",
      doctorLicense: "MD67890",
      hospital: "Metro Health Center",
      hospitalAddress: "456 Health Ave, Medical District, MD 67890",
      notes: "Post-surgery care. Take complete rest for 2 weeks."
    },
    disease: "Post-operative care",
    medicines: [
      { name: "Amoxicillin", dosage: "250mg", frequency: "Three times daily", duration: "7 days", instructions: "Complete the course" }
    ],
    surgery: {
      name: "Appendectomy",
      date: "2024-05-14",
      outcome: "Successful, no complications"
    },
    nextVisit: "2024-05-22"
  }
];

const scanReports = [
  {
    id: '1',
    date: "2024-05-20",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    type: "MRI Scan",
    bodyPart: "Right Knee",
    result: "Minor ligament tear detected in the anterior cruciate ligament (ACL). No bone fractures observed.",
    doctor: "Dr. Kim Wilson",
    doctorLicense: "RD54321",
    hospital: "Advanced Imaging Center",
    hospitalAddress: "789 Radiology Blvd, Scan City, SC 54321",
    technician: "Tech. Robert Lee",
    equipment: "Siemens MRI 3.0T",
    findings: [
      "Partial tear of anterior cruciate ligament",
      "Mild joint effusion present",
      "No meniscal damage observed",
      "Bone structures appear normal"
    ],
    recommendations: [
      "Physical therapy recommended",
      "Avoid high-impact activities",
      "Follow-up in 6 weeks",
      "Consider arthroscopic evaluation if symptoms persist"
    ]
  },
  {
    id: '2',
    date: "2023-11-15",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    type: "CT Scan",
    bodyPart: "Abdomen",
    result: "Normal abdominal structures. No abnormalities detected.",
    doctor: "Dr. Lisa Park",
    doctorLicense: "RD98765",
    hospital: "Central Hospital",
    hospitalAddress: "321 Central Ave, Downtown, DT 98765",
    technician: "Tech. Maria Garcia",
    equipment: "GE CT Scanner",
    findings: [
      "Liver: Normal size and density",
      "Kidneys: Both kidneys normal",
      "Pancreas: Normal appearance",
      "No masses or lesions detected"
    ],
    recommendations: [
      "Continue routine health monitoring",
      "No immediate follow-up required",
      "Annual check-up recommended"
    ]
  }
];

const bloodTestReports = [
  {
    id: '1',
    date: "2024-06-01",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    testType: "Comprehensive Metabolic Panel",
    doctor: "Dr. Priya Patel",
    doctorLicense: "MD11111",
    hospital: "HealthLab Diagnostics",
    hospitalAddress: "555 Lab Street, Test City, TC 11111",
    labTechnician: "Lab Tech. David Chen",
    tests: [
      { name: "Fasting Blood Sugar", result: "95", unit: "mg/dL", normalRange: "70-110", status: "Normal" },
      { name: "HbA1c", result: "5.2", unit: "%", normalRange: "4.0-5.6", status: "Normal" },
      { name: "Total Cholesterol", result: "180", unit: "mg/dL", normalRange: "<200", status: "Normal" },
      { name: "HDL Cholesterol", result: "45", unit: "mg/dL", normalRange: ">40", status: "Normal" },
      { name: "LDL Cholesterol", result: "110", unit: "mg/dL", normalRange: "<130", status: "Normal" },
      { name: "Triglycerides", result: "125", unit: "mg/dL", normalRange: "<150", status: "Normal" }
    ],
    notes: "All values within normal limits. Continue current lifestyle.",
    recommendations: [
      "Maintain current diet and exercise routine",
      "Repeat testing in 6 months",
      "Continue monitoring blood pressure"
    ]
  },
  {
    id: '2',
    date: "2023-12-10",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    testType: "Complete Blood Count (CBC)",
    doctor: "Dr. Sarah Smith",
    doctorLicense: "MD12345",
    hospital: "City General Hospital",
    hospitalAddress: "123 Medical Center Dr, Healthcare City, HC 12345",
    labTechnician: "Lab Tech. Jennifer Wong",
    tests: [
      { name: "Hemoglobin", result: "14.2", unit: "g/dL", normalRange: "13.5-17.5", status: "Normal" },
      { name: "Hematocrit", result: "42.1", unit: "%", normalRange: "41-53", status: "Normal" },
      { name: "White Blood Cells", result: "6.8", unit: "K/uL", normalRange: "4.5-11.0", status: "Normal" },
      { name: "Platelets", result: "285", unit: "K/uL", normalRange: "150-450", status: "Normal" }
    ],
    notes: "Complete blood count within normal parameters.",
    recommendations: [
      "No action required",
      "Annual screening recommended"
    ]
  }
];

const dischargeSummaries = [
  {
    id: '1',
    date: "2024-05-16",
    patientName: "John Doe",
    patientAge: 32,
    patientGender: "Male",
    admissionDate: "2024-05-14",
    dischargeDate: "2024-05-16",
    hospital: "Metro General Hospital",
    hospitalAddress: "789 Emergency Blvd, Urgent City, UC 78901",
    attendingDoctor: "Dr. James Lee",
    doctorLicense: "MD55555",
    diagnosis: "Acute Appendicitis",
    procedure: "Laparoscopic Appendectomy",
    summary: "Patient admitted with acute abdominal pain. Diagnosed with acute appendicitis. Underwent successful laparoscopic appendectomy. Post-operative recovery was uncomplicated. Patient is stable and ready for discharge.",
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Every 6 hours as needed", duration: "5 days" },
      { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" }
    ],
    instructions: [
      "Rest for 1-2 weeks",
      "No heavy lifting for 4 weeks",
      "Keep incision sites clean and dry",
      "Return to normal diet gradually",
      "Follow up in 1 week"
    ],
    followUp: "2024-05-23",
    emergencyContact: "Return immediately if fever >101°F, severe pain, or signs of infection"
  },
  {
    id: '2',
    date: "2022-11-23",
    patientName: "John Doe",
    patientAge: 30,
    patientGender: "Male",
    admissionDate: "2022-11-21",
    dischargeDate: "2022-11-23",
    hospital: "Sports Medicine Clinic",
    hospitalAddress: "456 Athletic Ave, Sports City, SP 45678",
    attendingDoctor: "Dr. Kim Wilson",
    doctorLicense: "MD33333",
    diagnosis: "Right Knee Ligament Strain",
    procedure: "Conservative Management",
    summary: "Patient presented with right knee pain following sports injury. MRI showed ligament strain without complete tear. Treated conservatively with rest, ice, compression, and elevation (RICE protocol).",
    medications: [
      { name: "Naproxen", dosage: "220mg", frequency: "Twice daily with food", duration: "10 days" }
    ],
    instructions: [
      "Physical therapy 3 times per week",
      "Use knee brace for 2 weeks",
      "Avoid running for 4 weeks",
      "Ice knee 15 minutes, 3 times daily",
      "Gradual return to activities"
    ],
    followUp: "2022-12-07",
    emergencyContact: "Return if severe pain, swelling, or inability to bear weight"
  }
];

const sections = [
  { title: "Prescription Reports", data: prescriptionReports },
  { title: "Scan Reports", data: scanReports },
  { title: "Blood Test Reports", data: bloodTestReports },
  { title: "Discharge Summary", data: dischargeSummaries }
];

// Helper function to get section icons
const getSectionIcon = (title) => {
  switch (title) {
    case "Prescription Reports":
      return "💊";
    case "Scan Reports":
      return "🔍";
    case "Blood Test Reports":
      return "🩸";
    case "Discharge Summary":
      return "📋";
    default:
      return "📄";
  }
};

export default function HealthReportScreen({ navigation, showHeader = false }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const reportTypes = [
    { key: 'all', label: 'All Reports' },
    { key: 'prescription', label: 'Prescriptions' },
    { key: 'scan', label: 'Scans' },
    { key: 'test', label: 'Tests' },
    { key: 'discharge', label: 'Discharge' }
  ];

  const getAllReports = () => {
    const allReports = [
      ...prescriptionReports.map(r => ({ ...r, type: 'prescription' })),
      ...scanReports.map(r => ({ ...r, type: 'scan' })),
      ...bloodTestReports.map(r => ({ ...r, type: 'test' })),
      ...dischargeSummaries.map(r => ({ ...r, type: 'discharge' }))
    ];
    
    // Sort by date descending
    return allReports.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getFilteredReports = () => {
    const allReports = getAllReports();
    if (selectedFilter === 'all') return allReports;
    return allReports.filter(report => report.type === selectedFilter);
  };

  const navigateToDetail = (report, reportType) => {
    if (navigation?.navigate) {
      navigation.navigate('ReportDetail', { report, reportType });
    }
  };

  const filteredReports = getFilteredReports();

  return (
    <View style={styles.container}>
      {showHeader && (
        <Header 
          title="Health Reports" 
          subtitle="View your medical history"
        />
      )}
      
      <View style={styles.filterContainer}>
        <FilterChips
          filters={reportTypes}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredReports.length > 0 ? (
          filteredReports.map((report, index) => (
            <ReportCard
              key={`${report.type}-${report.id || index}`}
              report={report}
              type={report.type}
              onPress={() => navigateToDetail(report, report.type)}
            />
          ))
        ) : (
          <EmptyState 
            customIcon="📋"
            title="No Reports Found"
            message={`No ${selectedFilter === 'all' ? '' : selectedFilter + ' '}reports available. Reports will appear here once uploaded or generated.`}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  filterContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  }
});
