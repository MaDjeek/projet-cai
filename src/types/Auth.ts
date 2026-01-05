export type UserRole = 'user' | 'admin' | 'officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // optional, used only for local mock authentication
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}