function backToTop() {
  document.body.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function fisherYatesShuffle(array: any[]): any[] {
  for (let i: number = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function floatTwoDigits(float: number) {
  return float.toFixed(2).replace('.', ',')
}

function sumThenParseFloat(question: any) {
  return floatTwoDigits(parseFloat(question.reduce((sum, item) => sum + item.point, 0)));
}

export { backToTop, fisherYatesShuffle, floatTwoDigits, sumThenParseFloat }