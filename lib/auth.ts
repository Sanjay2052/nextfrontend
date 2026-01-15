import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken";

// 1. Define the interface so TS knows what a "UserPayload" looks like
export interface UserPayload {
  userid: string;
  email: string;
  username: string;
  role: string;
}

const SECRET = process.env.JWT_SECRET || "secret";

export const verifyToken = (token: string): UserPayload => {
  try {
    // 2. Cast the decoded JWT to your interface
    return jwt.verify(token, SECRET) as UserPayload;
  } catch {
    throw new Error('Invalid token');
  }
};

export const requireAuth = async (): Promise<UserPayload> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  try {
    return verifyToken(token);
  } catch {
    redirect('/login');
  }
};




