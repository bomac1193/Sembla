export const ADMIN_COOKIE_NAME = "sembla_admin";

function normalized(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function getAdminAccessCode(): string {
  return normalized(process.env.ADMIN_ACCESS_CODE);
}

export function getAdminSessionToken(): string {
  return normalized(process.env.ADMIN_SESSION_TOKEN);
}

export function hasAdminConfig(): boolean {
  return Boolean(getAdminAccessCode() && getAdminSessionToken());
}

export function isAdminSessionToken(value?: string | null): boolean {
  if (!value) return false;
  return value === getAdminSessionToken();
}

export function verifyAdminAccessCode(value: string): boolean {
  const accessCode = getAdminAccessCode();
  if (!accessCode) return false;
  return value.trim() === accessCode;
}

export function sanitizeRedirectPath(value?: string | null): string {
  if (!value || !value.startsWith("/")) return "/admin";
  if (value.startsWith("//")) return "/admin";
  return value;
}
