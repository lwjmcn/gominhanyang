import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './store/pages/Counter';
import React from 'react';
import Layout from '@/layout';
import SignInPage from '@/pages/auth/SignIn';
import SignUpPage from '@/pages/auth/SignUp';
import { ProtectedRoute, PublicRoute } from '@/route';
import BeachPage from './pages/beach/Beach';
import SettingPage from './pages/beach/Setting';
import ResponseCompletePage from './pages/beach/response/ResponseComplete';
import ResponseWritePage from './pages/beach/response/ResponseWrite';
import ItemListPage from './pages/item/ItemList';
import PostOfficePage from './pages/post/PostOffice';
import LetterWritePage from './pages/post/send/LetterWrite';
import LetterSharePage from './pages/post/send/LetterShare';
import LetterCompletePage from './pages/post/send/LetterComplete';
import LetterListPage from './pages/post/save/LetterList';
import LetterDetailPage from './pages/post/save/LetterDetail';
import ResponseListPage from './pages/beach/response/ResponseList';

function App() {
  return (
    <React.StrictMode>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<BeachPage />} />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/responses" element={<ResponseListPage />} />
              <Route path="/responses/:responseId" element={<ResponseWritePage />} />
              <Route path="/responses/:responseId/complete" element={<ResponseCompletePage />} />

              <Route path="/items" element={<ItemListPage />} />

              <Route path="/post" element={<PostOfficePage />} />
              <Route path="/letter/share" element={<LetterSharePage />} />
              <Route path="/letter/write" element={<LetterWritePage />} />
              <Route path="/letter/complete" element={<LetterCompletePage />} />

              <Route path="/letters" element={<LetterListPage />} />
              <Route path="/letters/:letterId" element={<LetterDetailPage />} />
            </Route>
            {/* <Route path="/counter" element={<Counter />} /> */}
          </Routes>
        </BrowserRouter>
      </Layout>
    </React.StrictMode>
  );
}

export default App;
