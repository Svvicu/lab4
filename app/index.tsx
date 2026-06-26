// app/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native'; //
import { useProfile } from '../context/ProfileContext'; //

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile(); //
  const [editing, setEditing] = useState(false); //

  // Formularz lokalny stanu
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState(profile.skills.join(', '));

  const handleSave = () => {
    // Walidacja
    if (name.trim().length < 2) {
      Alert.alert('Błąd', 'Imię musi mieć min. 2 znaki'); //
      return;
    }
    if (bio.trim().length < 10) {
      Alert.alert('Błąd', 'Opis musi mieć min. 10 znaków'); //
      return;
    }
    const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillList.length === 0) {
      Alert.alert('Błąd', 'Podaj min. 1 umiejętność'); //
      return;
    }

    updateProfile({ name, bio, skills: skillList }); //
    setEditing(false); //
  };

  if (editing) { //
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Edycja Profilu</Text>

        <Text style={styles.label}>Imię i nazwisko</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Opis biograficzny</Text>
        <TextInput style={[styles.input, styles.textArea]} value={bio} onChangeText={setBio} multiline />

        <Text style={styles.label}>Umiejętności (po przecinku)</Text>
        <TextInput style={styles.input} value={skills} onChangeText={setSkills} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Zapisz</Text> {/* */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditing(false)}>
          <Text style={styles.cancelBtnText}>Anuluj</Text> {/* */}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mój Profil</Text>
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileBio}>{profile.bio}</Text>
      <Text style={styles.skillsHeader}>Umiejętności:</Text>
      <Text style={styles.profileSkills}>{profile.skills.join(', ')}</Text>

      <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
        <Text style={styles.btnText}>Edytuj profil</Text> {/* */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f4f8', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  profileName: { fontSize: 22, fontWeight: '600', marginBottom: 8, color: '#111827' },
  profileBio: { fontSize: 16, color: '#4b5563', marginBottom: 16, lineHeight: 22 },
  skillsHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  profileSkills: { fontSize: 15, color: '#2563eb', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 10, fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  editBtn: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 8, alignItems: 'center' },
  saveBtn: { backgroundColor: '#10b981', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  cancelBtn: { padding: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelBtnText: { color: '#4b5563', fontSize: 16 }
});