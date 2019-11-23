import { keys } from "./keys.js";
import axios from "axios";

export function getImage(query) {
  let imgArr = [];
  axios
    .get(
      `https://api.unsplash.com/search/photos?client_id=${keys.accessKey}&page=1&query=${query}`
    )
    .then(data => {
      let obj = {
        image: data.data.results[0].urls.small,
        correct: true
      };
      imgArr.push(obj);
    });

  axios
    .get(
      `https://api.unsplash.com/photos/random?client_id=${keys.accessKey}&page=1&query=${query}`
    )
    .then(data => {
      let obj = {
        image: data.data.urls.small,
        correct: false
      };
      imgArr.push(obj);
    });
  axios
    .get(
      `https://api.unsplash.com/photos/random?client_id=${keys.accessKey}&page=1&query=${query}`
    )
    .then(data => {
      let obj = {
        image: data.data.urls.small,
        correct: false
      };
      imgArr.push(obj);
    });
  axios
    .get(
      `https://api.unsplash.com/photos/random?client_id=${keys.accessKey}&page=1&query=${query}`
    )
    .then(data => {
      let obj = {
        image: data.data.urls.small,
        correct: false
      };
      imgArr.push(obj);
    });
}
