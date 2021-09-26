import {SpeechSentence, SpeechSentenceType} from "@store/speech/speech.store";
import {environment}                        from "../../../../environments/environment";
import {guid}                               from "@datorama/akita";
import {EmotesQuery}                        from "@store/emotes/emotes.query";
import {SpeechQuery}                        from "@store/speech/speech.query";
import {StyleQuery}                         from "@store/style/style.query";
import sample from "lodash-es/sample";

export function GenerateSentence(
  text: string,
  finalized = false,
  type      = SpeechSentenceType.voice,
  emotesQuery: EmotesQuery,
  speechQuery: SpeechQuery,
  styleQuery: StyleQuery): SpeechSentence | null {
  if (text === undefined || text === " ")
    return null;

  const sentences = speechQuery.getAll().filter(s => s.type === type);
  const globalStyle = styleQuery.getValue().currentStyle.globalStyle;

  if (text === "" && finalized) { // azure fix for empty finalized strings
    // try confirm last sentence
    const lastUnconfirmed = sentences.findIndex(s => !s.finalized)
    return lastUnconfirmed === -1 ? null : {...sentences[lastUnconfirmed], finalized: true};
  }

  let words             = text.trim().split(" ");
  let value: string[][] = [];


  // region profanity
  let og_dictionary = speechQuery.getValue().profanityWords;
  let dictionary = new Set(og_dictionary);
  if (finalized && dictionary.size > 0) {
    for (let i = 0; i < words.length; i++) {
      if (words[i][0] === "*" || words[i][1] === "*" || words[i][2] === "*") {
        if (dictionary.size === 0)
          dictionary = new Set(og_dictionary); // refill if empty
        let takeSample = sample(Array.from(dictionary));
        if (takeSample) {
          dictionary.delete(takeSample);
          words[i] = takeSample;
        }
      }
    }
  }
  // endregion

  let ttsValue          = words.join(" ");

  if (environment.features.EMOTES) {
    const emotesState         = emotesQuery.getValue();
    const emotesBindings      = emotesState.bindings_cache;
    const emotesKeyword       = emotesState.keyword.toLocaleLowerCase();
    const emotesKeywordSecond = emotesState.keyword_secondary.toLocaleLowerCase();

    // region find emotes keyword bindings
    if (emotesKeyword || emotesKeywordSecond) {
      for (let i = 0; i < words.length; i++) {
        if (i + 1 === words.length) break; // ignore if last word
        const wLower = words[i].toLocaleLowerCase();
        if (wLower === emotesKeyword || wLower === emotesKeywordSecond) {
          const first_word  = words[i + 1]?.replace(".", "").replace(",", ""),
                second_word = words[i + 2]?.replace(".", "").replace(",", "");
          if (emotesBindings[first_word]?.[second_word]) // replace two words
            words.splice(i, 3, emotesBindings[first_word][second_word])
          else if (emotesBindings[first_word]?.['']) // replace one word
            words.splice(i, 2, emotesBindings[first_word]['']);
        }
      }
    }
    // endregion

    ttsValue = words.join(" "); // join mutated words to send clean version to tts

    // region insert emotes
    value = words.map((word, i) => {
      const firstLetter  = word[0];
      const wordFiltered = word.replace(".", "");
      if (emotesState.emotes[firstLetter]?.[wordFiltered])
        return [`<img class="emote" src="${emotesState.emotes[firstLetter]?.[wordFiltered]}">`, " "]
      return [...word.split(""), " "];
    });
    // endregion
  }
  else
    value = words.map(word => [...word.split(""), " "]);

  // add dot at the end of the sentence if no symbols found
  if (finalized) {
    const lastWord   = value[value.length - 1];
    const lastLetter = lastWord[lastWord.length - 2];
    if (!/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g.test(lastLetter)) {
      lastWord.splice(-1, 0, ".");
      value[value.length - 1] = lastWord;
    }
  }

  let targetSentence: SpeechSentence;
  let animation: SpeechSentence['animation'] = {
    animate:      !!globalStyle.typingAnimation.value[0],
    animateWords: !!globalStyle.typeWords.value[0],
    interval:     globalStyle.typingDelay.value[0],
  }
  if (sentences.length === 0 || sentences[sentences.length - 1].finalized) // create new
    targetSentence = {finalized, valueNext: value, id: guid(), type, ttsValue, animation};
  else // update last sentence
    targetSentence = {...sentences[sentences.length - 1], finalized, valueNext: value, ttsValue};
  return targetSentence;
}
