import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Layout from '@/layout';
import AppRoutes from '@/route';

function App() {
  return (
    <React.StrictMode>
      <Layout>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Layout>
    </React.StrictMode>
  );
}

export default App;
