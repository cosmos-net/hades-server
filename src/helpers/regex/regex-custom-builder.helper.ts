interface RegExOptions {
  minLength?: number;
  maxLength?: number;
  allowLetters?: boolean;
  allowNumbers?: boolean;
  allowSpaces?: boolean;
  allowCaseInsensitive?: boolean;
  specialChars?: string;
}

const regexCustomBuilderHelper = (options: RegExOptions): RegExp => {
  let characterSet = '';

  if (options.allowLetters) {
    const isCaseSensitive = options.allowCaseInsensitive ?? false;
    characterSet += isCaseSensitive ? 'a-zA-Z' : 'a-z';
  }

  if (options.allowNumbers) {
    characterSet += '0-9';
  }

  if (options.allowSpaces) {
    characterSet += '\\s';
  }

  if (options.specialChars) {
    const escapedSpecialChars = options.specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    characterSet += escapedSpecialChars;
  }

  let quantifier = '*';
  const isMinLengthDefined = options.minLength !== undefined;
  const isMaxLengthDefined = options.maxLength !== undefined;
  const isMinAndMaxLengthDefined = isMinLengthDefined && isMaxLengthDefined;
  const isMinGreaterThanMax = isMinAndMaxLengthDefined && options.minLength > options.maxLength;

  if (isMinAndMaxLengthDefined) {
    if (isMinGreaterThanMax) {
      throw new Error('Min length cannot be greater than max length');
    }

    quantifier = `{${options.minLength},${options.maxLength}}`;
  } else if (isMinLengthDefined) {
    quantifier = `{${options.minLength},}`;
  } else if (isMaxLengthDefined) {
    quantifier = `{0,${options.maxLength}}`;
  }

  const pattern = `^[${characterSet}]${quantifier}$`;

  const flags = options.allowCaseInsensitive ? 'i' : '';

  return new RegExp(pattern, flags);
};

export default regexCustomBuilderHelper;
