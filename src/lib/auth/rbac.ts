import type { Role } from "@/types/rbac";

import { PERMISSIONS } from "@/types/rbac";

export function hasPermission(
  role: Role,
  resource: keyof typeof PERMISSIONS,
  action: keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS],
): boolean {
  const allowedRoles = PERMISSIONS[resource][
    action as keyof (typeof PERMISSIONS)[typeof resource]
  ] as Role[];
  return allowedRoles.includes(role);
}

export function assertPermission(
  role: Role,
  resource: keyof typeof PERMISSIONS,
  action: keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS],
): void {
  if (!hasPermission(role, resource, action)) {
    throw new Error(`FORBIDDEN: Role ${role} cannot ${String(action)} on ${resource}`);
  }
}
