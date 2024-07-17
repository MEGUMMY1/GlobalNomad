import { useCallback } from 'react';

export default function useEnterSubmit(onSubmit: () => void) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault(); //
        onSubmit();
      }
    },
    [onSubmit]
  );

  return handleKeyDown;
}
