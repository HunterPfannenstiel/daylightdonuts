export const highlightInvalidInput = (form: HTMLFormElement) => {
  const inputIndexes = [1, 2, 3, 4, 5, 6, 7];
  for (let i = 0; i < inputIndexes.length; i++) {
    const input = form.elements.item(inputIndexes[i]) as HTMLInputElement;
    if (!input.checkValidity()) {
      if (input.select) input.select();
      return;
    }
  }
};
