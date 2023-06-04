import { imgageHost } from "../../stores/GeneralStore";

// TODO: get correct images

export const getImagePath = (path: string | null) => {
  // remove /img/ from path
  if (path !== null) {
    path = path.replace("./img/", "");
    path = path.replace("/img/", "");
    return `${imgageHost}/${path}`;
  }

  return "";
};
