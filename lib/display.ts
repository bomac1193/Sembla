const UPPERCASE_TOKENS = ["AI", "DJ", "MC"];

export function toDisplayCase(value: string): string {
  const titled = value
    .toLocaleLowerCase()
    .replace(/(^|[\s/\-&('])\p{L}/gu, (match) => match.toLocaleUpperCase());

  return titled.replace(/\b(ai|dj|mc)\b/giu, (match) => match.toLocaleUpperCase());
}

export function normalizeDiscipline(value: string): string {
  return toDisplayCase(value.trim().replace(/\s+/g, " "));
}
