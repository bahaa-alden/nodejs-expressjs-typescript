const UPPER_LOWER_CASE =
  /(?<upperCaseLetter>\p{Lu})(?<lowerCaseLetter>\p{Ll})/gu;
const LOWER_UPPER_CASE =
  /(?<lowerCaseLetter>\p{Ll})(?<upperCaseLetter>\p{Lu})/gu;
const LEADING_CAPITAL = /^\p{Lu}(?!\p{Lu})/gu;
const IDENTIFIER = /(?<identifier>[\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/u;
const LEADING_SEPARATORS = new RegExp(`^${SEPARATORS.source}`, 'u');
const SEPARATORS_AND_IDENTIFIER = new RegExp(
  SEPARATORS.source + IDENTIFIER.source,
  'gu',
);
const NUMBERS_AND_IDENTIFIER = new RegExp(`\\d+${IDENTIFIER.source}`, 'gu');

const preserveCamelCase = (string: string): string =>
  string
    .replace(
      UPPER_LOWER_CASE,
      (_, upperCaseLetter, lowerCaseLetter) =>
        `-${upperCaseLetter}${lowerCaseLetter}`,
    )
    .replace(
      LOWER_UPPER_CASE,
      (_, lowerCaseLetter, upperCaseLetter) =>
        `${lowerCaseLetter}-${upperCaseLetter}`,
    );

const convertToCamelCase = (
  input: string,
  toUpperCase: (string: string) => string,
): string =>
  input
    .replace(LEADING_SEPARATORS, '')
    .replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) =>
      toUpperCase(identifier),
    )
    .replace(NUMBERS_AND_IDENTIFIER, (string) => toUpperCase(string));

const preserveConsecutiveUppercase = (
  input: string,
  toLowerCase: (string: string) => string,
): string => input.replace(LEADING_CAPITAL, (string) => toLowerCase(string));

const getLowerCaseFn = (locale?: string): ((string: string) => string) =>
  locale
    ? (string: string) => string.toLocaleLowerCase(locale)
    : (string: string) => string.toLowerCase();

const getUpperCaseFn = (locale?: string): ((string: string) => string) =>
  locale
    ? (string: string) => string.toLocaleUpperCase(locale)
    : (string: string) => string.toUpperCase();

export interface Options {
  locale?: string;
  preserveConsecutiveUppercase?: boolean;
}

export const camelCase = (
  input: string | string[],
  options?: Options,
): string => {
  const toLowerCase = getLowerCaseFn(options?.locale);
  const toUpperCase = getUpperCaseFn(options?.locale);

  if (Array.isArray(input)) {
    input = input
      .map((item: string) => item.trim())
      .filter((item: string) => Boolean(item.length))
      .join('-');
  }

  input = input.trim();

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1 && SEPARATORS.test(input)) {
    return '';
  }

  const containsUpperCase = input !== toLowerCase(input);
  if (containsUpperCase) {
    input = preserveCamelCase(input);
  }

  input =
    (options?.preserveConsecutiveUppercase ?? false)
      ? preserveConsecutiveUppercase(input, toLowerCase)
      : toLowerCase(input);

  return convertToCamelCase(input, toUpperCase);
};

export const pascalCase = (
  input: string | string[],
  options?: Options,
): string => {
  input = camelCase(input, options);

  const toUpperCase = getUpperCaseFn(options?.locale);
  input = toUpperCase(input.charAt(0)) + input.slice(1);

  return input;
};
