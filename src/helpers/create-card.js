import {getRandomElement} from "./helpers";

export const createCardData = (count, data) => {
  const newCards = [];

  for (let i = 0; i < count; i++) {
    newCards.push({
      title: getRandomElement(data.title),
      tags: data.hashtags,
      picture: data.picture,
      repeatingDays: data.repeatingDays,
      type: getRandomElement(data.types),
      color: getRandomElement(data.colors),
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    });
  }
  return newCards;
};
