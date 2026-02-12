export function currency(value: number): string {
   return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
   }).format(value);
}
