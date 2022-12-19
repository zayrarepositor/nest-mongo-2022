export function formatter(value: object): string {
  const string = JSON.stringify(value, null, 2);
  const cleanedValue = string.replace(/\n(  )?|\"/gi, '');
  return cleanedValue;
}
