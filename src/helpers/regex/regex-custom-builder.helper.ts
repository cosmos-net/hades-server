type RegExOptions = {
  specialChars?: string;
  minLength?: number;
  maxLength?: number;
  allowLetters?: boolean;
  allowNumbers?: boolean;
  allowSpaces?: boolean;
  allowCaseInsensitive?: boolean;
};

const regexCustomBuilderHelper = (options: RegExOptions): RegExp => {
  let pattern = '^';

  if (options.allowLetters) {
    const isCaseSensitive = options.allowCaseInsensitive ?? false;
    pattern += isCaseSensitive ? 'a-zA-Z' : 'a-z';
  }

  if (options.allowNumbers) {
    pattern += '0-9';
  }

  if (options.allowSpaces) {
    pattern += '\\s';
  }

  if (options.specialChars) {
    const escapedSpecialChars = options.specialChars.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    pattern += escapedSpecialChars;
  }

  let quantifier = '*';
  if (options.minLength !== undefined || options.maxLength !== undefined) {
    const min = options.minLength ?? 0;
    const max =
      options.maxLength !== undefined
        ? `{${min},${options.maxLength}}`
        : `{${min},}`;
    quantifier = max;
  }

  pattern = `[${pattern}]${quantifier}$`;

  const flags = options.allowCaseInsensitive ? 'i' : '';

  return new RegExp(pattern, flags);
};

export default regexCustomBuilderHelper;
