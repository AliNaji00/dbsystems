import { imgageHost } from "../../stores/GeneralStore";

export const getImagePath = (path: string | null) => {
  // remove /img/ from path
  return `${imgageHost}${path}`;
};
