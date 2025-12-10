// src/types/prisma.ts
import { User, Link, Analytics } from "@prisma/client";

export type { User, Link, Analytics };

// Extended types for API responses
export interface UserWithLinks extends User {
  links: Link[];
}

export interface LinkWithAnalytics extends Link {
  analytics: Analytics[];
}

export interface AnalyticsSummary {
  totalClicks: number;
  totalPageViews: number;
  popularLinks: Array<{
    id: string;
    title: string;
    clicks: number;
  }>;
}

// Request types with proper optional fields
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateUserRequest {
  bio?: string;
  avatar?: string;
  theme?: string;
}

export interface CreateLinkRequest {
  title: string;
  url: string;
  icon?: string;
  order?: number;
  userId: string;
}

export interface UpdateLinkRequest {
  title?: string;
  url?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
