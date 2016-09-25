/* @flow */
'use strict';

import type {
  TumblrAPIResponse,
  PhotoPost,
} from './tumblr-types';

// The Tumblr API is documented at https://www.tumblr.com/docs/en/api/v2.
// Please register your own API key if you're going to use this app.
const API_KEY = 'AgwlbT1xjc1mMwRCndI1Z1TU1OwFdNUz6gFAL04L9PwBmo91W4';
const API_BASE = 'https://api.tumblr.com/v2';

export async function loadPhotoPosts(
  tumblelog: string,
  offset: number = 0,
  limit: number = 20,
): Promise<Array<PhotoPost>> {
  const apiUrl = `${API_BASE}/blog/${tumblelog}/posts/photo?${[
   `limit=${encodeURIComponent(String(limit))}`,
   `offset=${encodeURIComponent(String(offset))}`,
   `api_key=${encodeURIComponent(API_KEY)}`,
  ].join('&')}`;

  const {
    meta,
    response,
  }: TumblrAPIResponse = await (await fetch(apiUrl)).json();

  switch (meta.status) {
    case 200:
      return response.posts;
    case 404:
      throw new Error('Not Found');
    default:
      throw new Error('API Error');
  }
}
