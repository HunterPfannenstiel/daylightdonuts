import { validate } from "email-validator";
import { phone } from "phone";

export const isFormValid = (
  form: HTMLFormElement | null
): { isValid: boolean; message?: string } => {
  if (!form) return { isValid: false, message: "Form has not loaded yet" };
  if (form.checkValidity()) {
    const dateInput = form.elements.item(7) as HTMLInputElement;
    if (!isValidClientDate(dateInput.value)) {
      dateInput.select();
      return { isValid: false, message: "Please select a pickup date" };
    }
    const emailInput = form.elements.item(3) as HTMLInputElement;
    if (!isValidClientEmail(emailInput.value)) {
      emailInput.select();
      return { isValid: false, message: "Email is not formatted properly" };
    }
    const phoneInput = form.elements.item(4) as HTMLInputElement;
    if (!isValidClientPhone(phoneInput.value)) {
      phoneInput.select();
      return {
        isValid: false,
        message: "Phone number is either invalid or not formatted properly",
      };
    }
    return { isValid: true };
  } else {
    const message = highlightInvalidInput(form);
    window.scroll(0, 0);
    return { isValid: false, message };
  }
};
export const highlightInvalidInput = (form: HTMLFormElement) => {
  const inputIndexes = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < inputIndexes.length; i++) {
    const input = form.elements.item(inputIndexes[i]) as HTMLInputElement;
    if (!input.checkValidity()) {
      if (input.select) input.select();
      return input.validationMessage;
    }
  }
};

export const isValidClientDate = (date: string) => {
  return date !== "Select a Date";
};

export const isValidClientEmail = (email: string) => {
  return validate(email);
};

export const isValidClientPhone = (phoneNumber: string) => {
  const { isValid } = phone(phoneNumber, {
    country: "USA",
  });
  return isValid;
};
