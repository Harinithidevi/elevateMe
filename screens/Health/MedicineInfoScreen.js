import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Import components
import Header from '../../components/common/Header';
import FilterChips from '../../components/common/FilterChips';
import SearchBar from '../../components/common/SearchBar';
import MedicineCard from '../../components/health/MedicineCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';

// Comprehensive medicine database following medical standards
const medicineDatabase = [
    {
        id: 1,
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        brandNames: ['Tylenol', 'Panadol', 'Crocin'],
        category: 'Pain Relief',
        indication: 'Pain relief and fever reduction',
        dosage: {
            adult: '500-1000mg every 4-6 hours (max 4000mg/day)',
            pediatric: '10-15mg/kg every 4-6 hours'
        },
        sideEffects: {
            common: ['Nausea', 'Stomach upset'],
            rare: ['Liver damage (with overdose)', 'Allergic reactions', 'Skin rash']
        },
        contraindications: ['Severe liver disease', 'Known hypersensitivity'],
        interactions: ['Warfarin', 'Alcohol (chronic use)'],
        pregnancyCategory: 'B',
        warnings: ['Do not exceed recommended dose', 'Risk of liver damage with overdose'],
        mechanism: 'Inhibits prostaglandin synthesis in the central nervous system',
        onset: '30-60 minutes',
        duration: '4-6 hours'
    },
    {
        id: 2,
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        brandNames: ['Advil', 'Motrin', 'Brufen'],
        category: 'NSAIDs',
        indication: 'Pain, inflammation, and fever reduction',
        dosage: {
            adult: '200-400mg every 4-6 hours (max 1200mg/day OTC)',
            pediatric: '5-10mg/kg every 6-8 hours'
        },
        sideEffects: {
            common: ['Stomach upset', 'Heartburn', 'Dizziness'],
            rare: ['GI bleeding', 'Kidney problems', 'Cardiovascular events']
        },
        contraindications: ['Active GI bleeding', 'Severe heart failure', 'Kidney disease'],
        interactions: ['Warfarin', 'ACE inhibitors', 'Lithium'],
        pregnancyCategory: 'C (D in 3rd trimester)',
        warnings: ['Take with food', 'Increased risk of heart attack and stroke'],
        mechanism: 'Inhibits COX-1 and COX-2 enzymes',
        onset: '30-60 minutes',
        duration: '4-6 hours'
    },
    {
        id: 3,
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        brandNames: ['Amoxil', 'Trimox', 'Moxatag'],
        category: 'Antibiotics',
        indication: 'Bacterial infections',
        dosage: {
            adult: '250-500mg every 8 hours or 500-875mg every 12 hours',
            pediatric: '20-40mg/kg/day divided every 8 hours'
        },
        sideEffects: {
            common: ['Nausea', 'Diarrhea', 'Vomiting'],
            rare: ['Allergic reactions', 'C. difficile colitis', 'Liver dysfunction']
        },
        contraindications: ['Penicillin allergy', 'Mononucleosis'],
        interactions: ['Methotrexate', 'Warfarin', 'Oral contraceptives'],
        pregnancyCategory: 'B',
        warnings: ['Complete full course', 'May reduce effectiveness of birth control'],
        mechanism: 'Inhibits bacterial cell wall synthesis',
        onset: '1-2 hours',
        duration: '8-12 hours'
    },
    {
        id: 4,
        name: 'Loratadine',
        genericName: 'Loratadine',
        brandNames: ['Claritin', 'Alavert', 'Tavist ND'],
        category: 'Antihistamines',
        indication: 'Allergic rhinitis, urticaria',
        dosage: {
            adult: '10mg once daily',
            pediatric: '5mg once daily (2-5 years), 10mg once daily (6+ years)'
        },
        sideEffects: {
            common: ['Headache', 'Drowsiness', 'Fatigue'],
            rare: ['Dry mouth', 'Nausea', 'Nervousness']
        },
        contraindications: ['Known hypersensitivity'],
        interactions: ['Ketoconazole', 'Erythromycin', 'Cimetidine'],
        pregnancyCategory: 'B',
        warnings: ['Non-drowsy formula', 'Use caution with liver disease'],
        mechanism: 'Selective H1 receptor antagonist',
        onset: '1-3 hours',
        duration: '24 hours'
    },
    {
        id: 5,
        name: 'Omeprazole',
        genericName: 'Omeprazole',
        brandNames: ['Prilosec', 'Losec', 'Omezol'],
        category: 'Proton Pump Inhibitors',
        indication: 'GERD, peptic ulcers, Zollinger-Ellison syndrome',
        dosage: {
            adult: '20mg once daily before meals',
            pediatric: '0.7-3.3mg/kg once daily'
        },
        sideEffects: {
            common: ['Headache', 'Diarrhea', 'Nausea'],
            rare: ['Vitamin B12 deficiency', 'Osteoporosis', 'C. diff infection']
        },
        contraindications: ['Hypersensitivity to PPIs'],
        interactions: ['Clopidogrel', 'Warfarin', 'Digoxin'],
        pregnancyCategory: 'C',
        warnings: ['Long-term use may increase fracture risk', 'Gradual discontinuation recommended'],
        mechanism: 'Irreversibly blocks gastric H+/K+ ATPase',
        onset: '1-2 hours',
        duration: '24-72 hours'
    },
    {
        id: 6,
        name: 'Metformin',
        genericName: 'Metformin',
        brandNames: ['Glucophage', 'Fortamet', 'Riomet'],
        category: 'Antidiabetics',
        indication: 'Type 2 diabetes mellitus',
        dosage: {
            adult: '500mg twice daily with meals, max 2000mg/day',
            pediatric: '500mg twice daily (10+ years)'
        },
        sideEffects: {
            common: ['Nausea', 'Diarrhea', 'Metallic taste'],
            rare: ['Lactic acidosis', 'Vitamin B12 deficiency', 'Hypoglycemia']
        },
        contraindications: ['Severe kidney disease', 'Metabolic acidosis', 'Heart failure'],
        interactions: ['Alcohol', 'Contrast dyes', 'Corticosteroids'],
        pregnancyCategory: 'B',
        warnings: ['Monitor kidney function', 'Discontinue before surgery'],
        mechanism: 'Decreases glucose production, increases insulin sensitivity',
        onset: '2-3 hours',
        duration: '12-24 hours'
    }
];

const MedicineInfoScreen = ({ showHeader = false }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { key: 'all', label: 'All Categories' },
        { key: 'Pain Relief', label: 'Pain Relief' },
        { key: 'NSAIDs', label: 'NSAIDs' },
        { key: 'Antihistamines', label: 'Antihistamines' },
        { key: 'Antibiotics', label: 'Antibiotics' },
        { key: 'Proton Pump Inhibitors', label: 'PPI' },
        { key: 'Antidiabetics', label: 'Diabetes' }
    ];

    const searchMedicine = async (searchTerm) => {
        if (!searchTerm.trim()) return [];
        
        let filtered = medicineDatabase.filter(med =>
            med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.brandNames.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
            med.indication.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(med => med.category === selectedCategory);
        }
        
        return filtered;
    };

    const handleSearch = async (searchTerm = '') => {
        const termToSearch = searchTerm || query;
        
        setLoading(true);
        setError(null);
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const data = await searchMedicine(termToSearch);
            setResults(data);
        } catch (e) {
            console.error('Search error:', e);
            setError('Error searching medicines. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        // Re-search with the new category filter
        if (query.trim()) {
            handleSearch(query);
        }
    };

    // Auto-search when query changes (debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                handleSearch(query);
            } else {
                setResults([]);
            }
        }, 300); // Debounce by 300ms

        return () => clearTimeout(timeoutId);
    }, [query, selectedCategory]);

    const handleMedicinePress = (medicine) => {
        console.log('Medicine pressed:', medicine.name);
        // Could navigate to detailed medicine screen
    };

    if (loading) {
        return <LoadingState />;
    }

    return (
        <View style={styles.container}>
            {showHeader && (
                <Header 
                    title="Medicine Information"
                    subtitle="Comprehensive drug reference"
                />
            )}

            <SearchBar
                placeholder="Search by medicine name, brand, or indication..."
                value={query}
                onChangeText={setQuery}
                onSearch={() => handleSearch(query)}
                onSubmitEditing={() => handleSearch(query)}
                onClear={() => {
                    setQuery('');
                    setResults([]);
                }}
            />

            <FilterChips
                filters={categories}
                selectedFilter={selectedCategory}
                onFilterChange={handleCategoryChange}
            />

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>⚠️ {error}</Text>
                </View>
            )}

            {!loading && results.length === 0 && query.trim() !== '' ? (
                <EmptyState 
                    title="No medicines found"
                    message={`No medicines found for "${query}". Try searching with different keywords.`}
                    customIcon="🔍"
                />
            ) : !loading && query.trim() === '' ? (
                <View style={styles.welcomeContainer}>
                    <EmptyState 
                        title="Search for Medicine Information"
                        message="Enter a medicine name, brand, or condition to get detailed information including dosage, side effects, and interactions."
                        customIcon="💊"
                    />
                    <View style={styles.examplesContainer}>
                        <Text style={styles.examplesTitle}>Try searching for:</Text>
                        <View style={styles.examplesList}>
                            <Text style={styles.exampleItem}>• Paracetamol</Text>
                            <Text style={styles.exampleItem}>• Tylenol</Text>
                            <Text style={styles.exampleItem}>• Pain relief</Text>
                            <Text style={styles.exampleItem}>• Antibiotics</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <ScrollView 
                    style={styles.resultsContainer}
                    contentContainerStyle={styles.resultsContent}
                    showsVerticalScrollIndicator={false}
                >
                    {loading && query.trim() !== '' && (
                        <View style={styles.loadingIndicator}>
                            <Text style={styles.loadingText}>🔍 Searching medicines...</Text>
                        </View>
                    )}
                    {results.map(medicine => (
                        <MedicineCard
                            key={medicine.id}
                            medicine={medicine}
                            onPress={() => handleMedicinePress(medicine)}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    resultsContent: {
        paddingBottom: 20,
    },
    errorContainer: {
        margin: 16,
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    errorText: {
        color: '#dc2626',
        fontSize: 16,
        textAlign: 'center',
    },
    welcomeContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    examplesContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    examplesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    examplesList: {
        marginLeft: 8,
    },
    exampleItem: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    loadingIndicator: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
        marginVertical: 8,
    },
    loadingText: {
        fontSize: 16,
        color: '#2196F3',
        fontWeight: '500',
    },
});

export default MedicineInfoScreen;
