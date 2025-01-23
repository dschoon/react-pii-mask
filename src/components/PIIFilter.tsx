import React, { useEffect, useRef, type PropsWithChildren } from 'react';
import { piiClasses, containsPII, maskPII } from '../utils/pii';

// Default tags to skip when processing
const DEFAULT_SKIP_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'LABEL'];

interface PIIFilterProps {
  skipTags?: string[];
  preserveFormat?: boolean;
  maskCharacter?: string;
  autoDetect?: boolean;
  ignorePatterns?: RegExp[];
}

export const PIIFilter: React.FC<PropsWithChildren<PIIFilterProps>> = ({ 
  children, 
  skipTags = DEFAULT_SKIP_TAGS,
  preserveFormat = false,
  maskCharacter = '*',
  autoDetect = true,
  ignorePatterns = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const processNode = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parentElement = node.parentElement;
      if (parentElement && skipTags.includes(parentElement.tagName)) {
        return; // Skip processing text in specified elements
      }
      
      // Only mask text nodes if autoDetect is enabled and PII is found
      if (node.textContent && 
          autoDetect && 
          containsPII(node.textContent) && 
          !ignorePatterns.some(pattern => pattern.test(node.textContent || ''))) {
        node.textContent = maskPII(node.textContent, { preserveFormat, maskCharacter });
      }
    }
    else if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
      // Skip processing if this is in skipTags
      if (skipTags.includes(node.tagName)) {
        return;
      }

      const classList = Array.from(node.classList);
      const isPIIElement = piiClasses.some(c => classList.includes(c));
      
      // Always mask PII-classed elements, regardless of autoDetect
      if (isPIIElement && 
          node.textContent && 
          !ignorePatterns.some(pattern => pattern.test(node.textContent || ''))) {
        node.textContent = maskPII(node.textContent, { preserveFormat, maskCharacter });
      }
      
      // Only process children if not a PII element
      if (!isPIIElement) {
        node.childNodes.forEach(processNode);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(processNode);
      });
    });

    observer.observe(container, { 
      childList: true, 
      subtree: true,
      characterData: true 
    });
    
    container.childNodes.forEach(processNode);
    
    return () => observer.disconnect();
  }, [skipTags, preserveFormat, maskCharacter, autoDetect, ignorePatterns]);

  return <div ref={containerRef}>{children}</div>;
};

export default PIIFilter;
