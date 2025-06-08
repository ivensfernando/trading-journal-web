// src/auth/authProvider.ts
import { API_URL } from '../config/api';
import { Credentials } from '../types/auth';

// const authProvider2 = {
//   login: async ({ username, password }: { username: string; password: string }) => {
//     const request = new Request(`${API_URL}/auth/login`, {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: new Headers({ 'Content-Type': 'application/json' }),
//     });
//
//     const response = await fetch(request);
//     if (!response.ok) {
//       throw new Error('Login failed');
//     }
//
//     const { token } = await response.json();
//     localStorage.setItem('auth_token', token);
//   },
//
//   logout: () => {
//     localStorage.removeItem('auth_token');
//     return Promise.resolve();
//   },
//
//   checkAuth: () => {
//     return localStorage.getItem('auth_token') ? Promise.resolve() : Promise.reject();
//   },
//
//   checkError: ({ status }: { status: number }) => {
//     if (status === 401 || status === 403) {
//       localStorage.removeItem('auth_token');
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },
//
//   getPermissions: () => Promise.resolve(), // Add role support later if needed
// };

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
    console.log('data =>',data);

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
};


export default authProvider;
