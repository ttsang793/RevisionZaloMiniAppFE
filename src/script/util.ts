import axios from "axios";

const render_api = axios.create({
  //baseURL: "https://localhost:7132"
  baseURL: "https://revision-app-9dgy.onrender.com"
});

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

function div(a: number, b: number): number {
  return Math.floor(a / b);
}

function floatTwoDigits(float: number): string {
  if (float === 10) return "10";
  return float.toFixed(2).replace('.', ',')
}

function sumThenParseFloat(question: any) {
  return floatTwoDigits(parseFloat(question.reduce((sum, item) => sum + item.point, 0)));
}

function stringToDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB");
}

function parseMinutesAndSeconds(second: number): string {
  if (second < 60) return `${second} giây`
  return `${div(second, 60)} phút ${second % 60} giây`;
}

export { render_api, backToTop, fisherYatesShuffle, floatTwoDigits, sumThenParseFloat, stringToDate, parseMinutesAndSeconds }