// src/app/core/models/user.model.ts
export interface AppUser {
  uid: string;
  codigoUsuario: string;
  nomeCompleto: string;
  email: string;
  // Outros campos podem ser adicionados aqui, como:
  // grupoId?: string;
  // roles?: string[]; // Ex: ['chefe', 'financeiro']
}
