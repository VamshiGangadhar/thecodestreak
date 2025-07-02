export const LEVELS = ["beginner", "intermediate", "advanced", "elite"];

export function getNextLevel(currentLevel: string): string | null {
  const idx = LEVELS.indexOf(currentLevel?.toLowerCase());
  if (idx === -1 || idx === LEVELS.length - 1) return null;
  return LEVELS[idx + 1];
}
