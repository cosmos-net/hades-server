// last-name.vo.spec.ts

import { LastName } from '@user/domain/value-objects/profile/last-name.vo';
import {
  MIN_PROFILE_LAST_NAME_LENGTH,
  MAX_PROFILE_LAST_NAME_LENGTH,
} from '@user/domain/constants/general-rules';

describe('LastName Value Object', () => {
  describe('Valid Last Names', () => {
    it('should create an instance with a valid last name', () => {
      const validName = 'Medina';
      const lastName = new LastName(validName);
      expect(lastName).toBeInstanceOf(LastName);
      expect(lastName._value).toBe(validName);
    });

    it('should accept a last name with minimum allowed length', () => {
      const minLengthName = 'Al'; // Adjust based on MIN_PROFILE_LAST_NAME_LENGTH
      const lastName = new LastName(minLengthName);
      expect(lastName._value).toBe(minLengthName);
    });

    it('should accept a last name with maximum allowed length', () => {
      const maxLengthName = 'A'.repeat(MAX_PROFILE_LAST_NAME_LENGTH);
      const lastName = new LastName(maxLengthName);
      expect(lastName._value).toBe(maxLengthName);
    });
  });

  describe('Invalid Last Names', () => {
    it('should throw an error if the last name is empty', () => {
      expect(() => new LastName('')).toThrow(
        `Last name  is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });

    it('should throw an error if the last name contains numbers', () => {
      const invalidName = 'Gonzalez123';
      expect(() => new LastName(invalidName)).toThrow(
        `Last name ${invalidName} is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });

    it('should throw an error if the last name contains spaces', () => {
      const invalidName = 'Gonzalez Perez';
      expect(() => new LastName(invalidName)).toThrow(
        `Last name ${invalidName} is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });

    it('should throw an error if the last name contains special characters', () => {
      const invalidName = 'Gonzalez@';
      expect(() => new LastName(invalidName)).toThrow(
        `Last name ${invalidName} is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });

    it('should throw an error if the last name is shorter than the minimum length', () => {
      const shortName = 'Al'; // Adjust based on MIN_PROFILE_LAST_NAME_LENGTH
      expect(() => new LastName(shortName)).toThrow(
        `Last name ${shortName} is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });

    it('should throw an error if the last name exceeds the maximum length', () => {
      const longName = 'A'.repeat(MAX_PROFILE_LAST_NAME_LENGTH + 1);
      expect(() => new LastName(longName)).toThrow(
        `Last name ${longName} is not valid. It must have a length between ${MIN_PROFILE_LAST_NAME_LENGTH} and ${MAX_PROFILE_LAST_NAME_LENGTH}, only letters, no spaces, no special characters, no numbers.`,
      );
    });
  });
});
