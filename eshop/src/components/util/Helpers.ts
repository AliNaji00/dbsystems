import { imgageHost } from "../../stores/GeneralStore";

export const getImagePath = (path: string | null | undefined) => {
  // remove /img/ from path
  if (path) {
    return `${imgageHost}${path}`;
  }
  return "";
};
