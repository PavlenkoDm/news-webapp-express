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
    };
  });
};

module.exports = modifyDBResponse;
