import bookImage from "./Images/book.svg";
import arrowDown from "./Images/arrow-down.svg";
import darkMode from "./Images/dark-mode.svg";
import searchIcon from "./Images/search.svg";
import closeButton from "./Images/close-button.svg";
import { useEffect, useState, useRef } from "react";

//Children
export function LogoBar() {
  const [boxIsHide, setBoxIsHide] = useState(true);
  const [selectedFont, setSelectedFont] = useState("sans-serif");
  const [darkModeToggle, setDarkModeToggle] = useState(false);

  function handleToggle() {
    setBoxIsHide((c) => !c);
  }

  function handleDarkModeToggle() {
    setDarkModeToggle((c) => !c);
  }

  useEffect(
    function () {
      if (darkModeToggle) {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#fff";
      }

      if (!darkModeToggle) {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#111";
      }
    },
    [darkModeToggle]
  );

  return (
    <div className="logo-bar">
      <img src={bookImage} alt="Icon of book" />

      <div className="font">
        <p className="font-text" onClick={handleToggle}>
          {selectedFont === "sans-serif" && "Sans Serif"}
          {selectedFont === "serif" && "Serif"}
          {selectedFont === "monospace" && "Mono"}
        </p>
        <img
          onClick={handleToggle}
          className="font-img"
          src={arrowDown}
          alt="arrow-down"
        />

        {!boxIsHide && (
          <FontOption
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            darkModeToggle={darkModeToggle}
          />
        )}
      </div>

      <div className="dark-mode">
        <label className="switch" onChange={handleDarkModeToggle}>
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>

        <img src={darkMode} alt="Dark mode icon" />
      </div>
    </div>
  );
}

export function SearchBar({
  query,
  setQuery,
  meanings,
  setMeaning,
  isLoading,
  setIsLoading,
  error,
  setError,
  audio,
  setAudio,
}) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchWords() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error(`No exact match found for "${query}" in English`);

          const data = await res.json();

          setMeaning(data);
          setAudio(data[0].phonetics[data[0].phonetics.length - 1].audio);
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      function callback(e) {
        if (e.code === "Enter") {
          fetchWords();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        controller.abort();
      };
    },
    [query, setMeaning, setIsLoading, setError, setAudio]
  );

  function handleClose() {
    inputEl.current.focus();
    setQuery("");
    setMeaning([]);
    setError("");
  }

  async function handlePlay() {
    setIsLoading(true);
    setError("");

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );

    if (!res.ok) {
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    setMeaning(data);
    setAudio(data[0].phonetics[data[0].phonetics.length - 1].audio);
    setIsLoading(false);
  }

  return (
    <div className="search-bar">
      <input
        autoFocus
        className="search"
        type="text"
        placeholder="Search for any word..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />

      {query && (
        <button className="close-btn" onClick={handleClose}>
          <img src={closeButton} alt="close" />
        </button>
      )}

      <button className="search-btn" onClick={handlePlay}>
        <img src={searchIcon} alt="search" />
      </button>
    </div>
  );
}

function FontOption({ selectedFont, setSelectedFont, darkModeToggle }) {
  const handleFontClick = (font) => {
    setSelectedFont(font);
  };

  useEffect(
    function () {
      document.body.style.fontFamily = selectedFont;
    },
    [selectedFont]
  );

  return (
    <div className="font-option">
      <p
        className={selectedFont === "sans-serif" ? "selected" : ""}
        onClick={() => handleFontClick("sans-serif")}
      >
        Sans Serif
      </p>
      <p
        className={selectedFont === "serif" ? "selected" : ""}
        onClick={() => handleFontClick("serif")}
      >
        Serif
      </p>
      <p
        className={selectedFont === "monospace" ? "selected" : ""}
        onClick={() => handleFontClick("monospace")}
      >
        Mono
      </p>
    </div>
  );
}
