export const concatClassNames = (...classNames: (string | undefined)[]) => {
  return classNames.join(" ").trim();
};
