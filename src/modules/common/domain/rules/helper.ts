export const validateNulishString = (value: string): boolean => {
  if (value === '' || value === undefined || value === null) return false;
  return true;
};

export const isNullish = (value: any): boolean => {
  if (value === undefined || value === null) return true;
  return false;
}