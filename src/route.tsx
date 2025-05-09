import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import SignInPage from './pages/auth/SignIn';
import SignUpPage from './pages/auth/SignUp';
import BeachPage from './pages/beach/Beach';
import ReceivedLetterListPage from './pages/beach/received/letter/ReceviedLetterList';
import ResponseCompletePage from './pages/beach/received/letter/ResponseComplete';
import ResponseWritePage from './pages/beach/received/letter/ResponseWrite';
import ReceivedPage from './pages/beach/received/Received';
import ReceivedResponseDetailPage from './pages/beach/received/response/ReceivedResponseDetail';
import ReceivedResponseListPage from './pages/beach/received/response/ReceivedResponseList';
import SettingPage from './pages/beach/Setting';
import ItemDetailModal from './pages/item/ItemDetail';
import ItemListPage from './pages/item/ItemList';
import PostOfficePage from './pages/post/PostOffice';
import LetterDetailPage from './pages/post/save/LetterDetail';
import LetterListPage from './pages/post/save/LetterList';
import LetterCompletePage from './pages/post/send/LetterComplete';
import LetterSharePage from './pages/post/send/LetterShare';
import LetterWritePage from './pages/post/send/LetterWrite';

export const ProtectedRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
};
export const PublicRoute = () => {
  const { isAuth } = useAuthStore();
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;
  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BeachPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/received" element={<ReceivedPage />} />
          <Route path="/received/responses" element={<ReceivedResponseListPage />} />
          <Route path="/received/responses/:responseId" element={<ReceivedResponseDetailPage />} />
          <Route path="/received/letters" element={<ReceivedLetterListPage />} />
          <Route path="/received/letters/:letterId" element={<ResponseWritePage />} />
          <Route path="/received/letters/:letterId/complete" element={<ResponseCompletePage />} />

          <Route path="/items" element={<ItemListPage />} />
          <Route path="/items/:itemId" element={<Navigate to="/items" replace />} />

          <Route path="/post" element={<PostOfficePage />} />
          <Route path="/letter/share" element={<LetterSharePage />} />
          <Route path="/letter/write" element={<LetterWritePage />} />
          <Route path="/letter/complete" element={<LetterCompletePage />} />
          <Route path="/letters" element={<LetterListPage />} />
          <Route path="/letters/:letterId" element={<LetterDetailPage />} />
        </Route>
        {/* <Route path="/counter" element={<Counter />} /> */}
      </Routes>

      {/* 모달 라우트 */}
      {backgroundLocation && (
        <Routes>
          <Route path="/items/:itemId" element={<ItemDetailModal />} />
        </Routes>
      )}
    </>
  );
}
