import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExampleComponent } from './ExampleComponent';
import 'react-pii-mask/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExampleComponent />
  </React.StrictMode>,
);
