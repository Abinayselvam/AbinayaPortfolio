export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

// ... keep existing ContactForm, Project, ApiResponse ...

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  tech: string[];
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
}