// Database Configuration & Cloud Sync Settings for VedicKundli
export const REMOTE_DB_CONFIG = {
  host: ((import.meta as any).env?.VITE_DB_HOST as string) || 'mysql-2655a94a-deepak8532036-4b43.e.aivencloud.com',
  port: Number((import.meta as any).env?.VITE_DB_PORT) || 22065,
  user: ((import.meta as any).env?.VITE_DB_USER as string) || 'avnadmin',
  database: ((import.meta as any).env?.VITE_DB_NAME as string) || 'defaultdb',
  ssl: true,
};

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isGuest?: boolean;
  createdAt: string;
}

export interface SavedKundliRecord {
  id: string;
  userId?: string;
  name: string;
  gender: string;
  birthDate: string;
  birthTime: string;
  cityName: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
  createdAt: string;
}

export interface SavedMatchRecord {
  id: string;
  userId?: string;
  maleName: string;
  maleDate: string;
  femaleName: string;
  femaleDate: string;
  totalScore: number;
  maxScore: number;
  resultDetails?: any;
  createdAt: string;
}
