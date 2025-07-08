import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importa o CSS global, incluindo Tailwind e a fonte
import App from './App';

// Encontra a div #root no HTML
const container = document.getElementById('root');
// Cria o root do React
const root = createRoot(container);

// Renderiza o App dentro de um StrictMode (opcional, mas recomendado para desenvolvimento)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
