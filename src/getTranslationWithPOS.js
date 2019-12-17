import axios from "axios";
import keyAPI from "./keyDict";

export const getTranslations = (word, pos) => {
  let translatedWordArr = [];
  let obj = {};
  const key = keyAPI.key;
  axios
    .get(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`
    )
    .then(res => {
      //console.log(res.data.def);

      if (res.data.def.length > 0) {
        let translatedWord = res.data.def[0].tr;
        let transcription = res.data.def[0].ts;

        translatedWord.forEach(word => {
          translatedWordArr.push(word.text);
        });

        obj.translatedWordArr = translatedWordArr;
        obj.transcription = transcription;
      } else {
        console.log("no word exist");
      }
    });

  return obj;
};
