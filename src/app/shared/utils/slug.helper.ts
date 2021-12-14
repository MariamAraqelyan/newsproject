export function getFirstWords(text: string, quintity = 6, charLimit = 70): string {
  const isEcxeedLimit = text.length > charLimit;
  const textToFormat = isEcxeedLimit ? text.slice(0, charLimit) : text;
  const words = textToFormat.trim().split(' ').filter((word, index) => (index + 1) <= quintity);

  return words.join(' ');
}
