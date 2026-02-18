export function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const trimmed = name.trim();
    const first = trimmed.charAt(0).toUpperCase();
    const last = trimmed.charAt(trimmed.length - 1).toUpperCase();
    return `${first}${last}`;
  }

  if (email && email.trim()) {
    return email.trim().charAt(0).toUpperCase();
  }

  return "U";
}
