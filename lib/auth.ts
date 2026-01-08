import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken";

export interface UserPayload {
  userid: string;
  email:string;
  username: string;
  role:string;
}

export const verifyToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, "secret") as UserPayload;
  } catch {
    throw new Error('Invalid token');
  }
};

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

//   console.log('Token:', token); // Debugging line
//   console.log('Allowed Roles:', allowedRoles); // Debugging line
  
  if (!token) {
    // console.log('No token found'); // Debugging line
    redirect('/login');
  }

  try {
    const user = verifyToken(token);
   
    return user;
  } catch {
    console.log('Token verification failed'); // Debugging line
    redirect('/login');
  }
};