import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import axios from 'axios'

// axios.interceptors.request.use( (request) => {
//   console.log(request);
//   return request;
// });

// axios.interceptors.response.use( (response) => {
//   console.log(response);
//   return response;
// })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
