import type { PhraseElement } from '@/features/module/schemas/fill-in-the-blanks-schema';

export const processPhrase = (phrase: PhraseElement[]): PhraseElement[] => {
  const sandwiched = ensureTextSandwich(phrase);
  const merged = mergeAdjacentText(sandwiched);
  return merged;
};

const ensureTextSandwich = (phrase: PhraseElement[]): PhraseElement[] => {
  return phrase.flatMap((item, index, arr) => {
    if (item.type === 'TEXT') {
      return [item];
    }

    const prevItem = arr[index - 1];
    const nextItem = arr[index + 1];

    const itemsToAdd: PhraseElement[] = [];

    if (!prevItem || prevItem.type === 'GAP') {
      itemsToAdd.push({
        id: crypto.randomUUID(),
        type: 'TEXT',
        content: ' ',
      });
    }

    itemsToAdd.push(item);

    if (!nextItem || nextItem.type === 'GAP') {
      itemsToAdd.push({
        id: crypto.randomUUID(),
        type: 'TEXT',
        content: ' ',
      });
    }

    return itemsToAdd;
  });
};

const mergeAdjacentText = (phrase: PhraseElement[]): PhraseElement[] => {
  return phrase.reduce((acc, currentItem) => {
    if (acc.length === 0) {
      return [currentItem];
    }

    const previousItem = acc[acc.length - 1];

    if (previousItem.type === 'TEXT' && currentItem.type === 'TEXT') {
      const mergedItem: PhraseElement = {
        ...previousItem,
        content: previousItem.content + currentItem.content,
      };
      acc[acc.length - 1] = mergedItem;
    } else {
      acc.push(currentItem);
    }
    return acc;
  }, [] as PhraseElement[]);
};
