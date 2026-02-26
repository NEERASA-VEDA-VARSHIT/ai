// Role-Based Access Control type definitions
// All roles and permissions defined here — single source of truth

export const ROLES = ["ADMIN", "ARCHITECT", "VIEWER"] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = {
  analysis: {
    create: ["ADMIN", "ARCHITECT"] as Role[],
    read: ["ADMIN", "ARCHITECT", "VIEWER"] as Role[],
    delete: ["ADMIN"] as Role[],
    update: ["ADMIN", "ARCHITECT"] as Role[],
  },
  users: {
    manage: ["ADMIN"] as Role[],
    read: ["ADMIN"] as Role[],
  },
} as const;

export type Resource = keyof typeof PERMISSIONS;
export type Action = keyof (typeof PERMISSIONS)[Resource];
