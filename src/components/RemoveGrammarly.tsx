'use client';

import { useEffect } from 'react';

export default function RemoveGrammarly() {
  useEffect(() => {
    const removeGrammarlyAttributes = () => {
      document.body.removeAttribute('data-new-gr-c-s-check-loaded');
      document.body.removeAttribute('data-gr-ext-installed');
    };

    // Run on mount and after hydration
    removeGrammarlyAttributes();
    const timer = setTimeout(removeGrammarlyAttributes, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
