// app/projects/new.tsx
import React, { useState } from 'react';
import {
  SafeAreaView, KeyboardAvoidingView, ScrollView, View, Text,
  TextInput, TouchableOpacity, Alert, Platform, StyleSheet
} from 'react-native'; //
import { useRouter } from 'expo-router'; //
import { useProjects } from '../../context/ProjectsContext'; //

export default function NewProjectScreen() {
  const { addProject } = useProjects(); //
  const router = useRouter(); //

  const [name, setName] = useState(''); //
  const [description, setDescription] = useState(''); //
  const [technologies, setTechnologies] = useState(''); //
  const [year, setYear] = useState(''); //
  const [errors, setErrors] = useState<Record<string, string>>({}); //

  const validate = () => { //
    const e: Record<string, string> = {}; //
    if (name.trim().length < 3) e.name = 'Min. 3 znaki'; //
    if (description.trim().length < 10) e.description = 'Min. 10 znakow'; //

    const techs = technologies.split(',').map(t => t.trim()).filter(Boolean); //
    if (techs.length === 0) e.technologies = 'Podaj min. 1 technologie'; //

    const y = parseInt(year, 10); //
    if (isNaN(y) || y < 2000 || y > 2030) e.year = 'Rok 2000-2030'; //

    setErrors(e); //
    return Object.keys(e).length === 0; //
  };

  const handleSave = () => {
    if (validate()) { //
      const techs = technologies.split(',').map(t => t.trim()).filter(Boolean); //
      addProject({
        name,
        description,
        technologies: techs,
        year: parseInt(year, 10) //
      }); //
      Alert.alert('Sukces', 'Projekt dodany!'); //
      router.back(); //
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}> {/* */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}> {/* */}
        <ScrollView contentContainerStyle={styles.scrollContainer}> {/* */}
          <Text style={styles.header}>Nowy projekt</Text> {/* */}

          {/* Nazwa */}
          <Text style={styles.label}>Nazwa projektu</Text> {/* */}
          <TextInput
            style={[styles.input, errors.name && styles.inputError]} //
            value={name}
            onChangeText={setName}
            placeholder="Wpisz nazwę"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>} {/* */}

          {/* Opis */}
          <Text style={styles.label}>Opis</Text> {/* */}
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputError]} //
            value={description}
            onChangeText={setDescription}
            placeholder="Opisz swój projekt"
            multiline
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>} {/* */}

          {/* Technologie */}
          <Text style={styles.label}>Technologie (oddzielone przecinkami)</Text> {/* */}
          <TextInput
            style={[styles.input, errors.technologies && styles.inputError]} //
            value={technologies}
            onChangeText={setTechnologies}
            placeholder="React Native, TypeScript, Expo"
          />
          {errors.technologies && <Text style={styles.errorText}>{errors.technologies}</Text>} {/* */}

          {/* Rok */}
          <Text style={styles.label}>Rok powstania</Text> {/* */}
          <TextInput
            style={[styles.input, errors.year && styles.inputError]} //
            value={year}
            onChangeText={setYear}
            placeholder="np. 2025"
            keyboardType="numeric"
          />
          {errors.year && <Text style={styles.errorText}>{errors.year}</Text>} {/* */}

          {/* Przyciski */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Zapisz projekt</Text> {/* */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Anuluj</Text> {/* */}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f4f8' }, //
  scrollContainer: { padding: 20 }, //
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }, //
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#374151' }, //
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 }, //
  textArea: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: '#ef4444' }, //
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 }, //
  saveButton: { backgroundColor: '#10b981', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  cancelButton: { padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButtonText: { color: '#6b7280', fontSize: 16, fontWeight: '500' }
});