'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'analista' | 'gestor' | 'cfo' | 'admin';
  company_id: string;
}

export const TEST_USERS: Record<string, UserSession> = {
  analista: {
    id: 'u0000000-0000-0000-0000-000000000001',
    name: 'Carlos Financeiro',
    email: 'analista@impacthub.net',
    role: 'analista',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  gestor: {
    id: 'u0000000-0000-0000-0000-000000000002',
    name: 'Beatriz Inovação',
    email: 'gestor@impacthub.net',
    role: 'gestor',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  cfo: {
    id: 'u0000000-0000-0000-0000-000000000003',
    name: 'Rodrigo Controller',
    email: 'cfo@impacthub.net',
    role: 'cfo',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  admin: {
    id: 'u0000000-0000-0000-0000-000000000004',
    name: 'Mariana Admin',
    email: 'admin@impacthub.net',
    role: 'admin',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
};

/**
 * Autentica o usuário com 1 clique utilizando as credenciais pré-cadastradas no seed.sql
 */
export async function loginWithPersona(role: 'analista' | 'gestor' | 'cfo' | 'admin') {
  const user = TEST_USERS[role];
  if (!user) {
    throw new Error('Perfil de persona não encontrado.');
  }

  const cookieStore = await cookies();
  cookieStore.set('ihf_session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  redirect('/kanban');
}

/**
 * Autentica o usuário via formulário de email/senha corporativo
 */
export async function loginWithCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios.' };
  }

  // Procura usuário correspondente
  const matchedUser = Object.values(TEST_USERS).find((u) => u.email === email);
  if (!matchedUser) {
    return { error: 'Credenciais inválidas. Utilize um dos atalhos de persona abaixo.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('ihf_session', JSON.stringify(matchedUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/kanban');
}

/**
 * Retorna a sessão ativa do usuário
 */
export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('ihf_session');
    if (!sessionCookie?.value) return null;
    return JSON.parse(sessionCookie.value) as UserSession;
  } catch {
    return null;
  }
}

/**
 * Encerra a sessão atual
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('ihf_session');
  redirect('/');
}

export const signOut = logout;

