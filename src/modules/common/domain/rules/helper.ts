export const validateNulishString = (value: string): boolean => {
  if (value === '' || value === undefined || value === null) return false;
  return true;
};
