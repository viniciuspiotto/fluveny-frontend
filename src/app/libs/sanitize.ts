import sanitizeHtml from 'sanitize-html';

export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'ul',
      'ol',
      'li',
      'blockquote',
      'code',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}
