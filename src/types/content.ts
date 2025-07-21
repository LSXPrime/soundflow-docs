export interface ContentPage {
  id: number;
  slug: string;
  version: string;
  title: string;
  description?: string;
  navOrder?: number;
  category?: string;
  content?: string; // Raw MDX content for Table of Contents
}

export interface NavigationItem {
  title: string;
  slug?: string;
  children?: NavigationItem[];
}

export interface TableOfContentsItem {
  id: string;
  title:string;
  level: number;
}