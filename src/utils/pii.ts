export const piiClasses = ['name', 'email', 'phone', 'pii'] as const;

export const piiPatterns = {
  email: /\S+@\S+\.\S+/,
  phone: /(\d{3}[-.]?){2}\d{4}/,
  id: /\b\d{3}-\d{2}-\d{4}\b/,
  name: /(?:Name:\s*)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/,
} as const;

export function maskPII(text: string, options?: { 
  preserveFormat?: boolean;
  maskCharacter?: string;
}): string {
  const { preserveFormat = false, maskCharacter = '*' } = options || {};

  if (!preserveFormat) {
    return text.replace(/./g, maskCharacter);
  }

  // Smart masking for emails
  if (piiPatterns.email.test(text)) {
    return text.replace(/[^@.]/g, maskCharacter);
  }

  // Smart masking for phone numbers
  if (piiPatterns.phone.test(text)) {
    return text.replace(/\d/g, maskCharacter);
  }

  // Smart masking for SSN/IDs
  if (piiPatterns.id.test(text)) {
    return text.replace(/\d/g, maskCharacter);
  }

  // Default masking for everything else
  return text.replace(/./g, maskCharacter);
}

export function containsPII(text: string): boolean {
  return Object.values(piiPatterns).some(pattern => pattern.test(text));
}

export type PIIClass = typeof piiClasses[number];
export type PIIPattern = keyof typeof piiPatterns; 
