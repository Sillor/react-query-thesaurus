import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function App() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ['words'],
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log('hello');
      }),
  });

  return (
    <>
      <input type="text" />
    </>
  );
}

function fetchWords(word) {
  return fetch('');
}

export default App;
