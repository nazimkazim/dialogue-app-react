import axios from "axios";

export const getTranslations = (word, pos) => {
  let translatedWordArr = [];
  let obj = {};
  const keyAPI =
    "dict.1.1.20191101T105247Z.e4967bda9fba183c.2e2703fc28b2d4f5283bb48a004dcb2327b4ba72";
  axios
    .get(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${keyAPI}&lang=en-ru&text=${word}`
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
