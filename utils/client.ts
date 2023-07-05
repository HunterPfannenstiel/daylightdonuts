export const concatClassNames = (...classNames: (string | undefined)[]) => {
  return classNames.reduce((accum, name) => {
    if (name) {
      return accum + " " + name;
    }
    return accum;
  });
};
