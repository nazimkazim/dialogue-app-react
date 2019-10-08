var unirest = require("unirest");

export const translator = word => {
  var req = unirest(
    "GET",
    `https://api.mymemory.translated.net/get?q=${word}&langpair=en|rus`
  );

  req.query({
    mt: "1",
    onlyprivate: "0",
    de: "a@b.c",
    langpair: "en|rus",
    q: word
  });

  req.headers({
    "x-rapidapi-host": `https://api.mymemory.translated.net/get?q=${word}&langpair=en|rus`,
    "x-rapidapi-key": "6c862424839db49603bb"
  });

  req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
};
