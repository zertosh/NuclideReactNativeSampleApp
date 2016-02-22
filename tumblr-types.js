/**
 * Tumblr API Response Types
 * @flow
 */

export type Blog = {
  title: string;
  name: string;
  posts: number;
  url: string;
  updated: number;
  description: string;
  is_nsfw: bool;
  ask: bool;
  ask_page_title: string;
  ask_anon: bool;
  share_likes: bool;
  likes: number;
};

type post$Type = 'text' | 'photo' | 'quote' | 'link' | 'chat' | 'audio' | 'video';
type post$State = 'published' | 'draft' | 'queue' | 'private';
type post$Format = 'html' | 'markdown';
type post$Tags = Array<string>;
type post$Highlighted = Array<any>; //TODO
type post$Reblog = {tree_html: string; comment: string;};
type post$Trail = Array<any>; //TODO

export type TextPost = any; //TODO
export type QuotePost = any; //TODO
export type LinkPost = any; //TODO
export type ChatPost = any; //TODO
export type AudioPost = any; //TODO
export type VideoPost = any; //TODO

type post$Photo = {
  url: string;
  width: number;
  height: number;
};

type post$Photos = {
  caption: string;
  alt_sizes: Array<post$Photo>;
  original_size: post$Photo;
};

export type PhotoPost = {
  blog_name: string;
  id: number;
  post_url: string;
  slug: string;
  type: 'photo';
  date: string;
  timestamp: number;
  state: post$State,
  format: post$Format;
  reblog_key: string;
  tags: post$Tags;
  short_url: string;
  summary: string;
  recommended_source: ?string;
  recommended_color: ?string;
  highlighted: post$Highlighted;
  note_count: number;
  caption: string;
  reblog: ?post$Reblog;
  trail: ?post$Trail;
  image_permalink: string;
  photos: Array<post$Photos>;
};

export type TumblrAPIResponse = {
  meta: {
    status: number;
    msg: string;
  };
  response: {
    blog: Blog;
    posts: Array<PhotoPost | TextPost | QuotePost | LinkPost | ChatPost | AudioPost | VideoPost>;
  };
};
