export const dateFormat = (d: Date): string =>
  `${d.getFullYear()}-${
    d.getMonth().toString().length == 1
      ? '0' + (d.getMonth() + 1)
      : d.getMonth()
  }-${d.getDate().toString().length == 1 ? '0' + d.getDate() : d.getDate()}`;
