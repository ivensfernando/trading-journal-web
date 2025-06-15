import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';

import dataProvider from './api/dataProvider';
import authProvider from './auth/authProvider';
import LoginPage from './auth/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import UserProfilePage from './pages/UserProfilePage';
import ExchangeKeysPage from './pages/ExchangeKeysPage';
import Dashboard from './pages/Dashboard';
import MyLayout from './layouts/MyLayout';
import { TradeList, TradeCreate, TradeEdit } from './resources/trades';
import { lightTheme, darkTheme } from './theme/theme';


function App() {
  // Log the env variable to verify it's loaded
  console.log('API_URL from .env:', process.env.REACT_APP_API_URL);
  return (
  <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={MyLayout}
      dashboard={Dashboard}
      theme={lightTheme}
      darkTheme={darkTheme} // ✅ enable dark mode
      defaultTheme="light"
  >
    <CustomRoutes>
      <Route path="/create-user" element={<CreateUserPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/exchange-keys" element={<ExchangeKeysPage />} />
    </CustomRoutes>
    <Resource
        name="trades"
        list={TradeList}
        create={TradeCreate}
        edit={TradeEdit}
    />
  </Admin>
  );
}

export default App;
