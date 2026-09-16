'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { TEST_USERS, type UserSession } from '@/lib/auth-types';
export type { UserSession };

/**
 * Autentica o usuário com 1 clique utilizando as credenciais pré-cadastradas no seed.sql
 */
export async function loginWithPersona(
  role: 'analista' | 'gestor' | 'cfo' | 'admin',
  redirectTo?: string
) {
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

  redirect(redirectTo || '/kanban');
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

