import { ServerError } from "custom-objects/ServerError";
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

export const createFormData = (
  data?: { [key: string]: any },
  imageArray?: { [key: string]: Array<Blob> },
  formData = new FormData()
) => {
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  if (imageArray) {
    Object.keys(imageArray).forEach((key) => {
      imageArray[key].forEach((item) => {
        formData.append(key, item);
      });
    });
  }
  return formData;
};

export const parseUndefinedToNull = (value: any) => {
  if (value === "undefined" || value === "null") return null;
  return value;
};

export const typeCheck = (
  type: "string" | "number" | "object",
  ...variables: { name: string; value: any }[]
) => {
  variables.forEach((variable) => {
    if (typeof variable.value !== type) {
      throw new ServerError(
        `Variable [${variable.name}] is not of type ${type}. Value received: ${variable.value}`,
        400
      );
    }
  });
};
