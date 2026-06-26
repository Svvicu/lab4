// context/ProfileContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'; //
import { saveData, loadData } from '../utils/storage';

export type Profile = { //
  name: string; //
  bio: string; //
  skills: string[]; //
};

type ProfileCtx = {
  profile: Profile; //
  updateProfile: (p: Profile) => void; //
};

const ProfileContext = createContext<ProfileCtx | null>(null);
const STORAGE_KEY = '@profile'; //

const defaultProfile: Profile = { //
  name: 'Twoje imie', //
  bio: 'Krotki opis...', //
  skills: ['React Native'] //
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadData<Profile>(STORAGE_KEY);
      if (stored) setProfile(stored);
      setLoaded(true);
    })();
  }, []);

  const updateProfile = (p: Profile) => { //
    setProfile(p);
    saveData(STORAGE_KEY, p);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile musi byc uzyty w ProfileProvider');
  return ctx;
}