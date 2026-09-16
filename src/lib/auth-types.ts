export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'analista' | 'gestor' | 'cfo' | 'admin';
  company_id: string;
}

export const TEST_USERS: Record<string, UserSession> = {
  analista: {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: 'Carlos Financeiro',
    email: 'analista@impacthub.net',
    role: 'analista',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  gestor: {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: 'Beatriz Inovação',
    email: 'gestor@impacthub.net',
    role: 'gestor',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  cfo: {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: 'Rodrigo Controller',
    email: 'cfo@impacthub.net',
    role: 'cfo',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
  admin: {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: 'Mariana Admin',
    email: 'admin@impacthub.net',
    role: 'admin',
    company_id: 'c0000000-0000-0000-0000-000000000001',
  },
};
