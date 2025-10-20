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

export { backToTop, fisherYatesShuffle }