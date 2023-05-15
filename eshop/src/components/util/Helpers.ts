import { imgageHost } from "../../stores/GeneralStore";

export const getImagePath = (path: string) => {
  // remove /img/ from path
  path = path.replace("./img/", "");

  return `${imgageHost}/${path}`;
};
