import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

// Sample data for each report type
const prescriptionReports = [
  {
    date: "2024-06-10",
    prescription: {
      doctor: "Dr. Smith",
      hospital: "City General Hospital",
      notes: "Continue medication, follow up in 1 month."
    },
    disease: "Hypertension",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" }
    ],
    surgery: null
  },
  // ... (other prescription reports)
];

const scanReports = [
  {
    date: "2024-05-20",
    type: "MRI",
    bodyPart: "Knee",
    result: "Minor ligament tear detected.",
    doctor: "Dr. Kim"
  },
  {
    date: "2023-11-15",
    type: "CT Scan",
    bodyPart: "Abdomen",
    result: "Normal",
    doctor: "Dr. Lee"
  }
];

const bloodTestReports = [
  {
    date: "2024-06-01",
    test: "Fasting Blood Sugar",
    result: "110 mg/dL",
    normalRange: "70-110 mg/dL",
    doctor: "Dr. Patel"
  },
  {
    date: "2023-12-10",
    test: "CBC",
    result: "Normal",
    normalRange: "Normal",
    doctor: "Dr. Smith"
  }
];

const dischargeSummaries = [
  {
    date: "2023-12-06",
    hospital: "Metro Clinic",
    diagnosis: "Appendicitis",
    summary: "Patient discharged in stable condition after appendectomy.",
    doctor: "Dr. Lee"
  },
  {
    date: "2022-11-21",
    hospital: "Green Valley Clinic",
    diagnosis: "Knee Injury",
    summary: "Discharged with advice for physiotherapy.",
    doctor: "Dr. Kim"
  }
];

const sections = [
  { title: "Prescription Reports", data: prescriptionReports },
  { title: "Scan Reports", data: scanReports },
  { title: "Blood Test Reports", data: bloodTestReports },
  { title: "Discharge Summary", data: dischargeSummaries }
];

export default function HealthReportScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleGeneratePrescription = (report) => {
    Alert.alert(
      "Generate Prescription",
      `Generating prescription for ${report.disease} (${report.date})`
    );
  };

  // Helper for section icons
  const getSectionIcon = (title) => {
    switch (title) {
      case "Prescription Reports":
        return "💊";
      case "Scan Reports":
        return "🩻";
      case "Blood Test Reports":
        return "🩸";
      case "Discharge Summary":
        return "🏥";
      default:
        return "📄";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sections.map((section, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.sectionBox,
            expandedSection === idx && { backgroundColor: "#d0e8ff", borderColor: "#007AFF", borderWidth: 1 }
          ]}
          onPress={() => setExpandedSection(expandedSection === idx ? null : idx)}
          activeOpacity={0.93}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
            <Text style={{ fontSize: 22, marginRight: 8 }}>{getSectionIcon(section.title)}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={{ marginLeft: "auto", fontSize: 18, color: "#007AFF" }}>
              {expandedSection === idx ? "▲" : "▼"}
            </Text>
          </View>
          {expandedSection === idx && (
            <View style={styles.sectionContent}>
              {section.title === "Prescription Reports" && section.data.map((report, i) => (
                <View key={i} style={[styles.reportBox, { borderLeftWidth: 5, borderLeftColor: "#007AFF" }]}>
                  <View style={styles.minInfo}>
                    <Text style={styles.reportDate}>{report.date}</Text>
                    <Text style={styles.disease}>{report.disease}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.genButton}
                    onPress={() => handleGeneratePrescription(report)}
                  >
                    <Text style={styles.genButtonText}>Generate Prescription</Text>
                  </TouchableOpacity>
                  <View style={styles.details}>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Doctor: </Text>
                      {report.prescription.doctor}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Hospital: </Text>
                      {report.prescription.hospital}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Notes: </Text>
                      {report.prescription.notes}
                    </Text>
                    <Text style={styles.sectionSubTitle}>Medicines</Text>
                    {report.medicines.map((med, j) => (
                      <Text key={j} style={{ marginLeft: 8, color: "#333" }}>
                        • {med.name} - {med.dosage} - {med.frequency}
                      </Text>
                    ))}
                    <Text style={styles.sectionSubTitle}>Surgery</Text>
                    {report.surgery ? (
                      <>
                        <Text>Name: {report.surgery.name}</Text>
                        <Text>Date: {report.surgery.date}</Text>
                        <Text>Outcome: {report.surgery.outcome}</Text>
                      </>
                    ) : (
                      <Text style={{ color: "#888" }}>None</Text>
                    )}
                  </View>
                </View>
              ))}
              {section.title === "Scan Reports" && section.data.map((scan, i) => (
                <View key={i} style={[styles.reportBox, { borderLeftWidth: 5, borderLeftColor: "#34c759" }]}>
                  <Text style={styles.reportDate}>{scan.date}</Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Type: </Text>
                    {scan.type}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Body Part: </Text>
                    {scan.bodyPart}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Result: </Text>
                    <Text style={{ color: "#007AFF" }}>{scan.result}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Doctor: </Text>
                    {scan.doctor}
                  </Text>
                </View>
              ))}
              {section.title === "Blood Test Reports" && section.data.map((test, i) => (
                <View key={i} style={[styles.reportBox, { borderLeftWidth: 5, borderLeftColor: "#ff375f" }]}>
                  <Text style={styles.reportDate}>{test.date}</Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Test: </Text>
                    {test.test}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Result: </Text>
                    <Text style={{ color: "#007AFF" }}>{test.result}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Normal Range: </Text>
                    {test.normalRange}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Doctor: </Text>
                    {test.doctor}
                  </Text>
                </View>
              ))}
              {section.title === "Discharge Summary" && section.data.map((summary, i) => (
                <View key={i} style={[styles.reportBox, { borderLeftWidth: 5, borderLeftColor: "#ff9500" }]}>
                  <Text style={styles.reportDate}>{summary.date}</Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Hospital: </Text>
                    {summary.hospital}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Diagnosis: </Text>
                    {summary.diagnosis}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Summary: </Text>
                    {summary.summary}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Doctor: </Text>
                    {summary.doctor}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  sectionBox: {
    width: '98%',
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 6
  },
  sectionContent: {
    marginTop: 8
  },
  reportBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 1
  },
  minInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reportDate: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  disease: { fontSize: 15, color: '#007AFF', fontWeight: '600' },
  details: { marginTop: 8 },
  sectionSubTitle: { fontWeight: 'bold', marginTop: 6 },
  genButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  genButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
