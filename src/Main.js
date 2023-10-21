import { useState } from "react";
import playSound from "./Images/play-sound.svg";

//Children
export function Meaning({ meanings, audio }) {
  const [, setMuted] = useState(true);

  function handleSound() {
    const player = new Audio(audio);
    const playPromise = player.play();

    if (playPromise !== undefined)
      return playPromise
        .then(() => setMuted(false))
        .catch(() => setMuted(false));
  }

  return (
    <div className="meaning">
      <div className="meaning-left">
        <h1 className="meaning-word">{meanings[0].word}</h1>
        <p className="meaning-pronoun">{meanings[0].phonetic}</p>
      </div>

      <button className="play-sound" onClick={handleSound}>
        <img src={playSound} alt="play sound button" />
      </button>
    </div>
  );
}

export function PartOfSpeech({ meanings }) {
  return (
    <ul className="part-of-speech-box">
      {meanings.map((meaning, i) => (
        <MeaningWord meaning={meaning} key={i} />
      ))}
    </ul>
  );
}

function MeaningWord({ meaning }) {
  return (
    <li>
      <h2 className="part-of-speech">{meaning.meanings[0].partOfSpeech}</h2>

      <div className="part-of-speech-meaning">
        <h3 className="meaning-part">Meaning</h3>

        <ul className="definition-meaning-list">
          {meaning.meanings[0].definitions.map((definitionWord, i) => (
            <Definition definitionWord={definitionWord} key={i} />
          ))}
        </ul>
      </div>
    </li>
  );
}

function Definition({ definitionWord }) {
  return (
    <li>
      <p className="meaning-of">{definitionWord.definition}</p>
      <p className="example">{definitionWord.example}</p>
    </li>
  );
}
