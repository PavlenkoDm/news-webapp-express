const modifyDBResponse = arrToModify => {
  return arrToModify.map(newsObj => {
    const {
      isFavourite,
      hasRead,
      title,
      publishDate,
      description,
      edition,
      author,
      category,
      imgLink,
      newsUrl,
      additionDate,
    } = newsObj;
    return {
      isFavourite,
      hasRead,
      title,
      publishDate,
      description,
      edition,
      author,
      category,
      imgLink,
      newsUrl,
      additionDate,
    };
  });
};

module.exports = modifyDBResponse;
