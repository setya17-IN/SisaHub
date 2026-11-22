export const formatRupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
export const formatDateId = (value: Date | string) => new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(value));
export const formatQuantity = (value: number, unit: string) => `${value} ${unit}`;
