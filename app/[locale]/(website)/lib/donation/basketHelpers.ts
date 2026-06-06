export function resolveSelectedAmount(
  selected: number,
  custom: string
): number | null {
  if (custom.trim() !== "") {
    const parsed = parseFloat(custom);
    return parsed > 0 ? parsed : null;
  }
  return selected > 0 ? selected : null;
}

export function intentionFromZakat(isZakat: boolean): string {
  return isZakat ? "Zakat" : "Sadaqah";
}
