export const getPropStoraged = <T extends string>(
  prop: string,
  defaultValue: T
): T => {
  const storagedValue = localStorage.getItem(prop) as T | null;
  return storagedValue ?? defaultValue;
};
