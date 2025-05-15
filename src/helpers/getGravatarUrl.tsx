import sha256 from 'crypto-js/sha256';

export default function getGravatarUrl(email: string): string {
  const sanitizedEmail = email.trim().toLowerCase();
  const hashedEmail = sha256(sanitizedEmail);
  return `https://www.gravatar.com/avatar/${hashedEmail}?`;
}
