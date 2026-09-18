import { AppUser, SavedKundliRecord, SavedMatchRecord } from './dbConfig';

const STORAGE_KEYS = {
  CURRENT_USER: 'vedic_kundli_current_user',
  SAVED_KUNDLIS: 'vedic_kundli_saved_charts',
  SAVED_MATCHES: 'vedic_kundli_match_history',
  LANGUAGE_PREF: 'vedic_kundli_language',
};

class DatabaseService {
  // --- User Auth & State ---
  public getCurrentUser(): AppUser | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  public setCurrentUser(user: AppUser | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  public loginWithGoogle(mockEmail?: string, mockName?: string): AppUser {
    const randomId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const user: AppUser = {
      id: randomId,
      name: mockName || 'गूगल उपयोगकर्ता',
      email: mockEmail || 'user@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isGuest: false,
      createdAt: new Date().toISOString(),
    };
    this.setCurrentUser(user);
    return user;
  }

  public skipAsGuest(): AppUser {
    const guestUser: AppUser = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      name: 'अतिथि (Guest)',
      email: '',
      isGuest: true,
      createdAt: new Date().toISOString(),
    };
    this.setCurrentUser(guestUser);
    return guestUser;
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // --- Saved Kundlis (Zero Hardcoded Initial Entries) ---
  public getSavedKundlis(): SavedKundliRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_KUNDLIS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public saveKundli(record: Omit<SavedKundliRecord, 'id' | 'createdAt'>): SavedKundliRecord {
    const existing = this.getSavedKundlis();
    const newRecord: SavedKundliRecord = {
      ...record,
      id: 'knd_' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEYS.SAVED_KUNDLIS, JSON.stringify(updated));
    return newRecord;
  }

  public deleteKundli(id: string): void {
    const existing = this.getSavedKundlis();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_KUNDLIS, JSON.stringify(updated));
  }

  // --- Match History ---
  public getSavedMatches(): SavedMatchRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_MATCHES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  public saveMatch(record: Omit<SavedMatchRecord, 'id' | 'createdAt'>): SavedMatchRecord {
    const existing = this.getSavedMatches();
    const newRecord: SavedMatchRecord = {
      ...record,
      id: 'match_' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEYS.SAVED_MATCHES, JSON.stringify(updated));
    return newRecord;
  }

  // --- Language Preference ---
  public getLanguage(): 'hi' | 'en' {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE_PREF) as 'hi' | 'en') || 'hi';
  }

  public setLanguage(lang: 'hi' | 'en'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE_PREF, lang);
  }
}

export const dbService = new DatabaseService();
