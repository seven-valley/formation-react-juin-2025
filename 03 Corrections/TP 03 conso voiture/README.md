# TP 2 correction
```jsx
import { useState, useRef } from 'react';
import './App.css'
export default function App() {
  const litre = useRef('');
  const km = useRef('');
  const [message, setmessage] = useState('')
  const afficher = () => {
    if (litre.current.value.length > 0 && km.current.value.length > 0) {
      const consomation = (litre.current.value * 100) / km.current.value
      if (!isNaN(consomation)){
        setmessage(consomation.toFixed(1))
      }
    }else {
      setmessage('') 
    }
  }
  return (
    <>
      <input ref={litre} placeholder="litres" onChange={afficher} />
      <input ref={km} placeholder="kilomètres" onChange={afficher} />
      <h1>{message}</h1>
    </>
  )
}

```
# Version 2 : Type Script sans bootstrap

```jsx
import { useState, useRef } from "react";
import "./App.css";
export default function App() {
  const litre = useRef<HTMLInputElement>(null);
  const km = useRef<HTMLInputElement>(null);
  const [message, setmessage] = useState<string>("");
  const afficher = () => {
    if (litre.current && km.current)
      if (litre.current.value.length > 0 && km.current.value.length > 0) {
        const consomation =
          (Number(litre.current.value) * 100) / Number(km.current.value);
        if (!isNaN(consomation)) {
          setmessage(consomation.toFixed(1));
        }
      } else {
        setmessage("");
      }
  };
  return (
    <>
      <input ref={litre} placeholder="litres" onChange={afficher} />
      <input ref={km} placeholder="kilomètres" onChange={afficher} />
      <h1>{message}</h1>
    </>
  );
}
```
