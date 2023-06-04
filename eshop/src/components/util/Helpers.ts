import { imgageHost } from "../../stores/GeneralStore";

export const getImagePath = (path: string | null) => {
  // remove /img/ from path
  if (path !== null) {
    path = path.replace("./img/", "");
    return `${imgageHost}/${path}`;
  }

  return "";
};
