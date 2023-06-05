import { imgageHost } from "../../stores/GeneralStore";

export const getImagePath = (path: string | null | undefined) => {
  // remove /img/ from path
  if (path) {
    return `${imgageHost}${path}`;
  }
  return "";
};

// Validate email
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const phoneRegex =
  // eslint-disable-next-line no-useless-escape
  /^(\+?\d{1,3}[\-\.\s]?)?\(?\d{2,3}\)?[\-\.\s]?\d{3}[\-\.\s]?\d{3,4}$/;
