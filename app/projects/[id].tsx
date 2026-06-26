// app/projects/[id].tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext'; //

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, removeProject } = useProjects(); //
  const router = useRouter();

  const project = projects.find(p => p.id === id); //

  if (!project) { //
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorHeader}>Nie znaleziono projektu</Text> {/* */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Wróć do listy</Text> {/* */}
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Usuń projekt',
      'Czy na pewno chcesz usunąć ten projekt ze szczegółów?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => {
            removeProject(project.id); //
            router.back(); //
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.year}>Rok: {project.year}</Text>
      <Text style={styles.desc}>{project.description}</Text>

      <Text style={styles.techTitle}>Technologie:</Text>
      <Text style={styles.techs}>{project.technologies.join(', ')}</Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}> {/* */}
        <Text style={styles.deleteBtnText}>Usuń projekt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  year: { fontSize: 16, color: '#6b7280', marginBottom: 16 },
  desc: { fontSize: 16, color: '#374151', marginBottom: 20, lineHeight: 22 },
  techTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  techs: { fontSize: 15, color: '#059669', marginBottom: 30 },
  deleteBtn: { backgroundColor: '#ef4444', padding: 14, borderRadius: 8, alignItems: 'center' }, //
  deleteBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 }, //
  backButton: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8 },
  backButtonText: { color: '#fff', fontWeight: 'bold' } //
});