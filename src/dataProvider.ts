import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { API_URL } from './config/api';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem('auth_token');
    options.user = {
        authenticated: true,
        token: `Bearer ${token}`,
    };
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_URL, httpClient);
export default dataProvider;
