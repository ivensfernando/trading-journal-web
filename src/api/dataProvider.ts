// src/api/dataProvider.ts
import { fetchUtils } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';

const apiUrl = 'http://localhost:3010'; // Your Go backend API

// const httpClient = (url: string, options: fetchUtils.Options = {}) => {
//     const token = localStorage.getItem('auth_token');
//     options.user = {
//         authenticated: true,
//         token: `Bearer ${token}`,
//     };
//     return fetchUtils.fetchJson(url, options);
// };

// 👇 This wrapper adds `credentials: 'include'` to every fetch call
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    console.log('options ',options);
    options.credentials = 'include';
    return fetchUtils.fetchJson(url, options).then((res) => {
        console.log('Response:', res.json);
        return res;
    });
};

// const httpClient = (url, options = {}) => {
//     return fetchUtils.fetchJson(url, options).then((res) => {
//         console.log('Response:', res.json);
//         return res;
//     });
// };

const baseProvider = jsonServerProvider(apiUrl, httpClient);

const dataProvider = {
    ...baseProvider,
    create: async (resource: string, params: any) => {
        const res = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });

        return { data: res.json.data }; // ✅ critical
    },
    getOne: async (resource: string, params: any) => {
        const response = await httpClient(`${apiUrl}/${resource}/${params.id}`);
        return { data: response.json.data }; // ✅ must return `data` object
    },
};

// const dataProvider = simpleRestProvider(apiUrl, httpClient);
export default dataProvider;
