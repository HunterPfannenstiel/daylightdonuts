import { validate } from "email-validator";
import { phone } from "phone";

export const validateEmail = (email: string) => {
  const isValidE = validate(email);
  if (!isValidE) throw new Error("Email is not formatted properly!");
};

export const validatePhone = (phoneNumber: string) => {
  const { isValid, phoneNumber: number } = phone(phoneNumber, {
    country: "USA",
  });
  if (!isValid) throw new Error("Phone number is not formatted properly!");
  return { formattedPhone: formatPhoneNumber(number) };
};
//+18175698900
const formatPhoneNumber = (phoneNumber: string) => {
  const areaCode = phoneNumber.slice(2, 5);
  const firstThree = phoneNumber.slice(5, 8);
  const lastFour = phoneNumber.slice(8, 12);
  return `(${areaCode}) ${firstThree}-${lastFour}`;
};
