import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { getDefaultOptions } from './lib/index.ts';
import { GlobalStyle } from './lib/styles/globalStyle.tsx';

const queryClient = new QueryClient({
  defaultOptions: getDefaultOptions(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
