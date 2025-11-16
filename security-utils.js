/**
 * Security Utilities for XSS Prevention
 * Provides safe methods for DOM manipulation and HTML sanitization
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - HTML-escaped text
 */
function escapeHTML(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Sanitizes user input by removing potentially dangerous tags and attributes
 * @param {string} html - The HTML to sanitize
 * @returns {string} - Sanitized HTML
 */
function sanitizeHTML(html) {
  if (!html) return '';
  
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // List of allowed tags
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                       'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'div', 'span',
                       'table', 'thead', 'tbody', 'tr', 'td', 'th'];
  
  // List of allowed attributes per tag
  const allowedAttributes = {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    '*': [] // No attributes for other tags by default
  };
  
  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      // Remove disallowed tags
      if (!allowedTags.includes(tagName)) {
        while (node.firstChild) {
          cleanNode(node.removeChild(node.firstChild));
        }
        node.parentNode.removeChild(node);
        return;
      }
      
      // Remove disallowed attributes
      const attrs = node.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        const attr = attrs[i];
        const allowed = allowedAttributes[tagName] || allowedAttributes['*'];
        
        // Special security checks
        if (attr.name.startsWith('on')) {
          node.removeAttribute(attr.name); // Remove event handlers
        } else if (!allowed.includes(attr.name)) {
          node.removeAttribute(attr.name);
        } else if (attr.name === 'href' || attr.name === 'src') {
          // Validate URLs don't have javascript: or data: protocols
          const value = attr.value;
          if (value.includes('javascript:') || value.includes('data:text/html')) {
            node.removeAttribute(attr.name);
          }
        }
      }
      
      // Clean child nodes
      const children = Array.from(node.childNodes);
      children.forEach(child => cleanNode(child));
    }
  }
  
  cleanNode(temp);
  return temp.innerHTML;
}

/**
 * Safely sets text content of an element
 * @param {HTMLElement} element - The element to update
 * @param {string} text - The text to set
 */
function safeSetTextContent(element, text) {
  if (!element) return;
  element.textContent = text;
}

/**
 * Safely sets inner HTML with sanitization
 * @param {HTMLElement} element - The element to update
 * @param {string} html - The HTML to set (will be sanitized)
 */
function safeSetInnerHTML(element, html) {
  if (!element) return;
  element.innerHTML = sanitizeHTML(html);
}

/**
 * Safely creates a template literal with sanitized values
 * Useful for creating DOM strings with user data
 * @param {Array<string>} strings - Template string parts
 * @param {...any} values - Values to interpolate
 * @returns {string} - Safe HTML string
 */
function safeHTML(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += escapeHTML(String(values[i]));
    }
  }
  return result;
}

/**
 * Creates a safe element with text content
 * @param {string} tag - HTML tag name
 * @param {string} text - Text content
 * @param {Object} attributes - Attributes to set
 * @returns {HTMLElement} - Created element
 */
function createSafeElement(tag, text = '', attributes = {}) {
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text; // textContent is safe, doesn't parse HTML
  }
  
  // Set allowed attributes
  Object.entries(attributes).forEach(([key, value]) => {
    // Only allow safe attributes
    if (!key.startsWith('on')) {
      if (key === 'href' || key === 'src') {
        // Validate URLs
        if (!String(value).includes('javascript:') && !String(value).includes('data:text/html')) {
          element.setAttribute(key, value);
        }
      } else {
        element.setAttribute(key, value);
      }
    }
  });
  
  return element;
}

/**
 * Validates and sanitizes URLs
 * @param {string} url - URL to validate
 * @returns {string|null} - Sanitized URL or null if invalid
 */
function validateURL(url) {
  if (!url) return null;
  
  try {
    // Check for dangerous protocols
    if (url.includes('javascript:') || url.includes('data:') || url.includes('vbscript:')) {
      return null;
    }
    
    // If it's a relative URL or starts with http/https, allow it
    if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHTML,
    sanitizeHTML,
    safeSetTextContent,
    safeSetInnerHTML,
    safeHTML,
    createSafeElement,
    validateURL
  };
}
