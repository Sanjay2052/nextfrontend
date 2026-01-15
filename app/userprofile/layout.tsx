import { requireAuth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  
  return (
    <div className="auth-wrapper">
      <nav>Welcome back, {user.username}</nav>
      {children}
    </div>
  );
}