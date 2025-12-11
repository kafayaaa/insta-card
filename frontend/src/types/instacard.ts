export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  bio?: string | null;
  avatar?: string | null;
  theme: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  links?: Link[];
  analytics?: Analytics[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string | null;
  order: number;
  clickCount?: number;
  isActive?: boolean;
  createdAt?: Date;

  userId: string;

  // Relation
  user?: User;
}

export interface Analytics {
  id: string;
  date: Date;
  linkId?: string | null;
  clicks: number;
  pageViews: number;

  userId: string;

  // Relations
  user?: User;
}
