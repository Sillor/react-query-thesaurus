import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App() {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();
  const { data: words, isLoading } = useQuery({
    queryKey: ['words', input],
    queryFn: () => fetchWords(input),
    enabled: input.length > 0,
  });

  useEffect(() => {
    if (input.length > 0) {
      queryClient.invalidateQueries(['words', input]);
    }
  }, [input, queryClient]);

  return (
    <>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        words && (
          <ul>
            {words.map((word, index) => (
              <li key={index}>{word.word}</li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

function fetchWords(word) {
  return fetch(`https://api.datamuse.com/words?rel_syn=${word}`).then(
    (response) => response.json()
  );
}

export default App;
