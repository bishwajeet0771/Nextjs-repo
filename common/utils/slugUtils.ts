export function isValidSlugId(id: string): boolean {
  return /^[a-f0-9]{32}$/i.test(id);
}
