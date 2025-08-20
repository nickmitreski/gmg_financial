export type UserRole = 'USER' | 'STAFF' | 'MANAGER' | 'ADMIN' | 'SUPER_ADMIN'

// Role hierarchy for permissions
const roleHierarchy: Record<UserRole, number> = {
  USER: 0,
  STAFF: 1,
  MANAGER: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Client-safe file: no next/headers or server-only APIs here

export function checkPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return hasPermission(userRole, requiredRole)
}

// Permission constants for different features
export const PERMISSIONS = {
  // User management
  VIEW_USERS: 'MANAGER' as UserRole,
  CREATE_USERS: 'ADMIN' as UserRole,
  EDIT_USERS: 'ADMIN' as UserRole,
  DELETE_USERS: 'SUPER_ADMIN' as UserRole,
  
  // Content management
  VIEW_ANALYTICS: 'STAFF' as UserRole,
  EDIT_CONTENT: 'MANAGER' as UserRole,
  PUBLISH_CONTENT: 'MANAGER' as UserRole,
  
  // System settings
  VIEW_SETTINGS: 'ADMIN' as UserRole,
  EDIT_SETTINGS: 'SUPER_ADMIN' as UserRole,
  
  // Client data
  VIEW_CLIENTS: 'STAFF' as UserRole,
  EDIT_CLIENTS: 'MANAGER' as UserRole,
  DELETE_CLIENTS: 'ADMIN' as UserRole,
  
  // Financial data
  VIEW_FINANCIAL_DATA: 'MANAGER' as UserRole,
  EDIT_FINANCIAL_DATA: 'ADMIN' as UserRole,
} as const