export type UserRole = 'owner' | 'admin' | 'manager' | 'employee' | 'kiosk';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  plan: 'free' | 'pro';
  kioskCode: string;
  ownerId: string;
  createdAt: string;
}

export interface Employee extends User {
  position?: string;
  hourlyRate?: number;
  isActive: boolean;
}

export interface Shift {
  id: string;
  employeeId: string;
  companyId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isPublished: boolean;
}

export interface Attendance {
  id: string;
  employeeId: string;
  companyId: string;
  type: 'check-in' | 'check-out';
  timestamp: string; // ISO string
  device: 'mobile' | 'kiosk';
}
