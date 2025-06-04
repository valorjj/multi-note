// src/api/auth.ts
const OAUTH2_BASE_URL = 'http://localhost:8080/oauth2/authorize';
const REDIRECT_URI = 'http://localhost:5173/oauth2/redirect';

export const googleLoginUrl = `${OAUTH2_BASE_URL}/google?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
