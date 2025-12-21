// src/types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order: number;
  clickCount: number;
  isActive: boolean;
  createdAt: Date;
  userId: string;
}

export interface Analytics {
  id: string;
  date: Date;
  linkId?: string;
  clicks: number;
  pageViews: number;
  userId: string;
}

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
}

export interface UpdateLinkRequest {
  title?: string;
  url?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export type DailyLinkStats = {
  linkId: string;
  title: string;
  url: string;
  clicks: number;
  views: number;
};

export type DailyStatsMap = Record<string, DailyLinkStats[]>;
