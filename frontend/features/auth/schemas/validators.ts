export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  if (!value.trim()) return "Email wajib diisi.";
  if (!emailPattern.test(value)) return "Format email belum benar.";
  return undefined;
}

export function validatePassword(value: string) {
  if (!value) return "Kata sandi wajib diisi.";
  if (value.length < 8) return "Kata sandi minimal 8 karakter.";
  return undefined;
}

export function validateRequired(value: string, label: string) {
  if (!value.trim()) return `${label} wajib diisi.`;
  return undefined;
}
