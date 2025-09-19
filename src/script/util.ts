function redirect(pathname: string) {
  location.href = location.origin + pathname;
}

export { redirect }