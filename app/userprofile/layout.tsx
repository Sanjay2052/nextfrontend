import { requireAuth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth(); // 🔐 server protection
  return <>
   <h1>Hello sanjay</h1>
  {children}
  <h1>This is for test footer</h1>
  </>;
}
