import { useAuthContext } from "../context/AuthContext";
import { SidebarLayout } from "@/features/sidebar/components/SidebarLayout";
import { SidebarProvider } from "@/features/sidebar/context/SidebarContext";

export function DashboardPage() {
  const { signOut, isLoading } = useAuthContext();

  const handleLogout = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <p className="text-[#7E8B9E] font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <SidebarLayout onLogout={handleLogout}>
        <h1 className="mb-2 text-2xl font-semibold">Bem-vindo ao Brainxly</h1>
        <p className="text-sm text-muted-foreground">
          Sidebar reimplementada e restaurada com estrutura completa de navegacao.
        </p>
      </SidebarLayout>
    </SidebarProvider>
  );
}
