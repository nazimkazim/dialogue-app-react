var nlp = require("compromise");

const isNounPlural = wordForTranlsation => {
  let isNounPlural =
    nlp(wordForTranlsation)
      .nouns()
      .isPlural().list[0] &&
    nlp(wordForTranlsation)
      .nouns()
      .isPlural().list[0].main.tags.Noun;

  return isNounPlural;
};

const singularizedNoun = wordForTranlsation => {
  let singularizedNoun =
    nlp(wordForTranlsation)
      .nouns()
      .toSingular().list[0] &&
    nlp(wordForTranlsation)
      .nouns()
      .toSingular().list[0].main.normal;
  return singularizedNoun;
};

const isVerbPastTense = wordForTranlsation => {
  let base = nlp(wordForTranlsation).verbs();
  let isVerb = base.length > 0;
  if (isVerb) {
    //console.log(base.list[0].verb.tags.PastTense);
    return base.list[0].verb.tags.PastTense;
    //return base[0].terms && base[0].terms[0].tags.PastTense;
  }
};

const infinitivizeVerb = wordForTranlsation => {
  let base = nlp(wordForTranlsation).verbs();
  let isVerb = base.length > 0;
  if (isVerb) {
    //console.log(base.toInfinitive().list[0].refText.list[0].terms[0]._text);
    return base.toInfinitive().list[0].refText.list[0].terms[0]._text;
  }
};

export { isNounPlural, singularizedNoun, infinitivizeVerb, isVerbPastTense };
