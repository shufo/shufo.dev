export interface Frontmatter {
  title: string;
  ogImage?: string;
  description: string;
  author: string;
  datetime: string;
  slug: string;
  featured: boolean;
  draft: boolean;
  tags: string[];
}

export interface ProjectFrontmatter {
  title: string;
  ogImage?: string;
  description: string;
  author: string;
  datetime: string;
  slug: string;
  featured: boolean;
  draft: boolean;
  tags: string[];
  year: string;
  thumbnail: string;
  tools: string[];
  links: string[];
  categories: string[];
  priority: number;
}

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Mail"
  | "Twitter"
  | "Twitch"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "TikTok"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Reddit"
  | "Skype"
  | "Steam"
  | "Telegram"
  | "Qiita"
  | "Scrapbox"
  | "Mastodon";

export type ToolIcons = {
  [icon in Tool]: string;
};

export type Tool =
  | "elixir"
  | "nuxt"
  | "php"
  | "laravel"
  | "nodejs"
  | "vuetifyjs"
  | "javascript"
  | "eslint"
  | "prettier"
  | "netlify"
  | "vue"
  | "astro"
  | "react"
  | "nginx"
  | "consul"
  | "typescript"
  | "vercel"
  | "vscode";
