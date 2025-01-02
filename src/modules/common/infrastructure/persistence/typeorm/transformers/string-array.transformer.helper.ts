import { ValueTransformer } from 'typeorm';

export const stringArrayTransformer: ValueTransformer = {
  to: (value: string[] | undefined): string | null => {
    if (!value) {
      return null;
    }

    // Convert the array to a string in format '{"RO","Eduardo"}'
    return '{' + value.map((v) => '"' + v + '"').join(',') + '}';
  },
  from: (value: string | null): string[] | null => {
    if (!value) {
      return null;
    }

    // Convert the string '{"RO","Eduardo"}' to ['RO', 'Eduardo']
    return value
      .replace(/[{}]/g, '') // Remove the braces {}
      .split(',') // Split by commas
      .map((v) => v.replace(/"/g, '').trim()); // Remove quotes and spaces
  },
};
