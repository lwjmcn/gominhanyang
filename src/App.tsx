import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './store/pages/Counter';
import React from 'react';
import Layout from '@/layout';

function App() {
  return (
    <React.StrictMode>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </React.StrictMode>
  );
}

export default App;
