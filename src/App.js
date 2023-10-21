import { LogoBar, SearchBar } from "./NavBar";
import { Meaning, PartOfSpeech } from "./Main";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [meanings, setMeaning] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [audio, setAudio] = useState("");

  return (
    <>
      <NavBar>
        <LogoBar />
        <SearchBar
          query={query}
          setQuery={setQuery}
          meanings={meanings}
          setMeaning={setMeaning}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          setError={setError}
          audio={audio}
          setAudio={setAudio}
        />
      </NavBar>

      {isLoading && <Loader />}

      {!isLoading && !error && meanings.length > 0 && (
        <Main>
          <Meaning meanings={meanings} audio={audio} />
          <PartOfSpeech meanings={meanings} />
        </Main>
      )}

      {error && <ErrorMessage error={error} />}
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return (
    <div className="center">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>⛔️ </span> {error}
    </p>
  );
}

export default App;
