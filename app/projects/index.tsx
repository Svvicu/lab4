import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectsListScreen() {
  const { projects, removeProject } = useProjects();
  const router = useRouter();

  // Stan do obsługi wyszukiwarki (Zadanie 7 - Ulepszenie)
  const [searchQuery, setSearchQuery] = useState('');

  // Funkcja wywołująca natywne okno dialogowe z potwierdzeniem usunięcia
  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      'Usuń projekt',
      `Czy na pewno chcesz bezpowrotnie usunąć projekt "${name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => removeProject(id)
        },
      ]
    );
  };

  // Filtrowanie projektów na podstawie wpisanej frazy (case-insensitive)
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Przycisk nawigacji do formularza dodawania nowego projektu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/projects/new')}
      >
        <Text style={styles.addButtonText}>+ Dodaj nowy projekt</Text>
      </TouchableOpacity>

      {/* Kontrolowane pole tekstowe wyszukiwarki (Ulepszenie) */}
      <TextInput
        style={styles.searchInput}
        placeholder="Wyszukaj projekt po nazwie..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Elastyczna lista projektów */}
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
                <Text style={styles.deleteText}>Usuń</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.year}>Rok powstania: {item.year}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Przycisk przejścia do ekranu szczegółów (routing dynamiczny) */}
            <TouchableOpacity
              onPress={() => router.push(`/projects/${item.id}`)}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>Zobacz szczegóły →</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'Brak projektów pasujących do kryteriów.' : 'Lista projektów jest pusta.'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f4f8'
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1f2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8
  },
  deleteText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 14,
    padding: 4
  },
  year: {
    color: '#6b7280',
    fontSize: 13,
    marginVertical: 4
  },
  desc: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 18
  },
  detailsButton: {
    alignSelf: 'flex-start'
  },
  detailsButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 14
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
    fontSize: 15
  }
});