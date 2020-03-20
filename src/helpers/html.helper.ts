import sanitizeHtml from 'sanitize-html';

const allowedTags = [
  'a',
  'p',
  'table',
  'thead',
  'tr',
  'th',
  'td',
  'ul',
  'ol',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'span',
  'blockquote',
  'strong',
  'b',
  'i',
  'em'
];

const allowedAttributes = {
  '*': ['id', 'href', 'name', 'target', 'colspan'],
  img: ['src']
};

const defaultOptions = {
  allowedTags: allowedTags,
  allowedAttributes: allowedAttributes
};

class HtmlHelper {
  sanitize = (dirty: string, options?: sanitizeHtml.IOptions | undefined) => {
    const combinedOptions = { ...defaultOptions, ...options };
    return {
      __html: sanitizeHtml(dirty, combinedOptions)
    };
  };
}

export const htmlHelper = new HtmlHelper();
