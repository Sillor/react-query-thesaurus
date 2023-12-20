import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const fetchWords = () =>
    fetch(`https://api.datamuse.com/words?rel_syn=${input}`).then((response) =>
      response.json()
    );

  const { data: words, isLoading } = useQuery({
    queryKey: ['words', input],
    queryFn: fetchWords,
    enabled: input.length > 0,
  });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Copied "${text}" to clipboard`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="app-container">
      <h1>Synonym Finder</h1>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        words && (
          <ul>
            {words.map(({ word }, index) => (
              <li key={index} onClick={() => copyToClipboard(word)}>
                {word}
              </li>
            ))}
          </ul>
        )
      )}
      <footer>
        <p>
          By{' '}
          <a href="https://github.com/Sillor/react-query-thesaurus">
            Egor Strakhov
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
