import { useAuth } from "./auth/hooks/useAuth";
import { AuthProvider, useAuthContext } from "./auth/context/AuthContext";
import { AuthPage } from "./auth/pages/AuthPage";
import { DashboardPage } from "./auth/pages/DashboardPage";
import "./App.css";

function AppContent() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <p className="text-[#7E8B9E] font-medium">Carregando...</p>
      </div>
    );
  }

  return user ? <DashboardPage /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider value={useAuth()}>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
