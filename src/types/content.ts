export interface Post {
  title: string;
  description: string;
  tags: string[];
  category: string;
  slug: string;
  date?: string;
  difficulty?: string;
  author?: string;
  featured?: boolean;
  draft?: boolean;
  series?: string;
  order?: number;
  content?: string;
}

export interface Note {
  title: string;
  description: string;
  tags: string[];
  category: string;
  slug: string;
  date?: string;
  difficulty?: string;
  author?: string;
  featured?: boolean;
  draft?: boolean;
  series?: string;
  order?: number;
  content?: string;
}

export interface Tag {
  name: string;
  count: number;
}

export interface Series {
  title: string;
  posts: Post[];
}
