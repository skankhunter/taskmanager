import {getRandomElement} from "./helpers";

export const createCardData = (count, data) => {
  function generateToken(length) {
    // edit the token allowed characters
    const a = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`.split(``);
    const b = [];
    for (let i = 0; i < length; i++) {
      let j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join(``);
  }

  function isRepeated(repeatingDays) {
    return Object.values(repeatingDays).some((it) => it === true);
  }

  const newCards = [];
  for (let i = 0; i < count; i++) {
    newCards.push({
      token: generateToken(32),
      title: getRandomElement(data.title),
      dueDate: data.dueDate,
      tags: data.hashtags,
      picture: data.picture,
      repeatingDays: data.repeatingDays,
      type: getRandomElement(data.types),
      color: getRandomElement(data.colors),
      isFavorite: data.isFavorite,
      isDone: data.isDone,
      isRepeated: isRepeated(data.repeatingDays)
    });
  }
  return newCards;
};
