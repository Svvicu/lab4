import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import ikon systemowych Expo
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProfileProvider } from '../context/ProfileContext';

// app/_layout.tsx

// ... zachowaj dotychczasowe importy na górze pliku

export default function RootLayout() {
  return (
    <ProjectsProvider>
      <ProfileProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#6b7280',
          }}
        >
          {/* Główny index - Profil */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Mój Profil',
              tabBarLabel: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />

          {/* Lista projektów */}
          <Tabs.Screen
            name="projects/index"
            options={{
              title: 'Projekty',
              tabBarLabel: 'Projekty',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="folder-open" size={size} color={color} />
              ),
            }}
          />

          {/* CRITICAL: UKRYCIE KATALOGU (TABS) Z DOLNEGO PASKA */}
          <Tabs.Screen
            name="(tabs)"
            options={{
              href: null, // To usunie brzydką ikonę "(tabs)" z ekranu
            }}
          />

          {/* Pozostałe ukryte ekrany techniczne */}
          <Tabs.Screen name="projects/new" options={{ href: null }} />
          <Tabs.Screen name="projects/[id]" options={{ href: null }} />
          <Tabs.Screen name="modal" options={{ href: null }} />

        </Tabs>
      </ProfileProvider>
    </ProjectsProvider>
  );
}