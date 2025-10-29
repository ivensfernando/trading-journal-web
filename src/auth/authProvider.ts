// src/auth/authProvider.ts
import { API_URL } from '../config/api';
import { Credentials } from '../types/auth';
import { UserIdentity } from '../types/user';

const authProvider = {
  login: async ({ username, password }: Credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    console.log(res);
    console.log(!res.ok);

    const data = await res.json();
    console.log('data =>', data);

    if (!res.ok) {
      console.log('vai lancar a excao com sucesso');
      throw new Error('Login failed');
    }

    return Promise.resolve();
  },

  logout: async () => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return Promise.resolve();
  },
  checkAuth: async () => {
    const res = await fetch(`${API_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok ? Promise.resolve() : Promise.reject();
  },
  checkError: ({ status }: { status: number }) => {
    return status === 401 || status === 403 ? Promise.reject() : Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: async (): Promise<UserIdentity> => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch identity');
      }

      const user = await res.json();
      const identity: UserIdentity = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName:
          user.fullName ??
          [user.firstName, user.lastName]
            .filter((part: string | undefined) => Boolean(part))
            .join(' '),
        phoneNumber: user.phoneNumber,
        timezone: user.timezone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return identity;
    } catch (error) {
      console.error('Unable to retrieve identity', error);
      throw new Error('Failed to fetch identity');
    }
  },
};

export default authProvider;
