/**
 * Security Headers Documentation
 *
 * These headers should be configured on the hosting platform (Firebase, Netlify, Nginx, etc.)
 * They are NOT set by Angular — they must be set by the server or CDN.
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │ Header                          │ Value                                             │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Content-Security-Policy         │ default-src 'self';                               │
 * │                                 │ script-src 'self';                                │
 * │                                 │ style-src 'self' 'unsafe-inline';                 │
 * │                                 │ img-src 'self' data: https:;                      │
 * │                                 │ font-src 'self' https://fonts.gstatic.com;        │
 * │                                 │ connect-src 'self' https://script.google.com;     │
 * │                                 │ frame-ancestors 'none';                           │
 * │                                 │ base-uri 'self';                                  │
 * │                                 │ form-action 'self'                                │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Strict-Transport-Security       │ max-age=31536000; includeSubDomains; preload      │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ X-Content-Type-Options          │ nosniff                                           │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ X-Frame-Options                 │ DENY                                              │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Referrer-Policy                 │ strict-origin-when-cross-origin                   │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Permissions-Policy              │ camera=(), microphone=(), geolocation=(),         │
 * │                                 │ payment=()                                        │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Cross-Origin-Opener-Policy      │ same-origin                                      │
 * ├─────────────────────────────────┼───────────────────────────────────────────────────┤
 * │ Cross-Origin-Embedder-Policy    │ require-corp                                     │
 * └─────────────────────────────────┴───────────────────────────────────────────────────┘
 *
 * Firebase Hosting Example (firebase.json):
 * {
 *   "hosting": {
 *     "headers": [
 *       {
 *         "source": "**",
 *         "headers": [
 *           { "key": "X-Content-Type-Options", "value": "nosniff" },
 *           { "key": "X-Frame-Options", "value": "DENY" },
 *           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
 *           { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
 *         ]
 *       }
 *     ]
 *   }
 * }
 *
 * Netlify Example (_headers file):
 * /*
 *   X-Content-Type-Options: nosniff
 *   X-Frame-Options: DENY
 *   Referrer-Policy: strict-origin-when-cross-origin
 *   Permissions-Policy: camera=(), microphone=(), geolocation=()
 *   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
 */

export const SECURITY_HEADERS = Object.freeze({
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://script.google.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin'
} as const);
