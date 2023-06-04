import { imgageHost } from "../../stores/GeneralStore";

// TODO: get correct images

export const getImagePath = (path: string | null) => {
  // remove /img/ from path
  return `${imgageHost}${path}`;
};
