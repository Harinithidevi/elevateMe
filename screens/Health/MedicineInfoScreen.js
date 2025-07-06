import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

// Mock API call function
const fetchMedicineInfo = async (medicineId) => {
    // Replace this with your real API call
    return {
        name: 'Paracetamol',
        why: 'Used to relieve pain and reduce fever.',
        sideEffects: [
            'Nausea',
            'Rash',
            'Liver damage (rare, with overdose)',
        ],
    };
};

const MedicineInfoScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock search API function
    const searchMedicine = async (searchTerm) => {
        if (!searchTerm) return [];
        const allMedicines = [
            { name: 'Paracetamol', why: 'Pain relief', sideEffects: ['Nausea'] },
            { name: 'Ibuprofen', why: 'Anti-inflammatory', sideEffects: ['Stomach upset'] },
            { name: 'Cetirizine', why: 'Allergy relief', sideEffects: ['Drowsiness'] },
        ];
        return allMedicines.filter(med =>
            med.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchMedicine(query);
            setResults(data);
        } catch (e) {
            setError('Error searching medicines.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Search Medicine</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter medicine name"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.input}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {loading && (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#007bff" />
                </View>
            )}
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
            {!loading && results.length === 0 && query !== '' && (
                <Text style={styles.noResultText}>No medicines found.</Text>
            )}
            {results.map((medicine, idx) => (
                <View key={idx} style={styles.card}>
                    <Text style={styles.heading}>{medicine.name}</Text>
                    <Text style={styles.label}>Why:</Text>
                    <Text style={styles.text}>{medicine.why}</Text>
                    <Text style={styles.label}>Side Effects:</Text>
                    <View style={styles.sideEffectsList}>
                        {medicine.sideEffects.map((effect, i) => (
                            <Text key={i} style={styles.sideEffectItem}>• {effect}</Text>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f6f8fa',
        flexGrow: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    input: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#222',
    },
    searchButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginLeft: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#22223b',
        letterSpacing: 1,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#007bff',
        marginBottom: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#495057',
        marginTop: 8,
        marginBottom: 2,
    },
    text: {
        fontSize: 16,
        color: '#222',
        marginBottom: 4,
    },
    sideEffectsList: {
        marginLeft: 8,
        marginTop: 2,
    },
    sideEffectItem: {
        fontSize: 15,
        color: '#e07a5f',
        marginBottom: 2,
    },
    errorText: {
        color: '#e63946',
        marginBottom: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noResultText: {
        color: '#6c757d',
        fontStyle: 'italic',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default MedicineInfoScreen;