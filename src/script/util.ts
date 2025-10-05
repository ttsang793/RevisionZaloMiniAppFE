function backToTop() {
  document.body.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export { backToTop }