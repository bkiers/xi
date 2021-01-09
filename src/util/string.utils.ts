import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
  const hash = bcrypt.hashSync(
    password,
    parseInt(process.env.XI_HASH_ROUNDS, 10),
  );

  return hash;
}

export function humanReadable(seconds: number): string {
  const parts = [];

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor(((seconds % 86400) % 3600) / 60);
  const s = seconds % 60;

  if (d > 0) {
    parts.push(`${d} day${d > 1 ? 's' : ''}`);
  }

  if (h > 0) {
    parts.push(`${h} hour${h > 1 ? 's' : ''}`);
  }

  if (m > 0) {
    parts.push(`${m} minute${m > 1 ? 's' : ''}`);
  }

  if (s > 0) {
    parts.push(`${s} second${s > 1 ? 's' : ''}`);
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `${parts.slice(0, parts.length - 1).join(', ')} and ${parts.pop()}`;
}
