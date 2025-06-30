# TP 2 correction

# Correction Sans maquette
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


# Correction avec maquette
```jsx
import { useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [conso,setConso]=useState('')
  const litre = useRef('')
  const km = useRef('')
  const calcul =()=>{
    if ((litre.current.value.length > 0) && (km.current.value.length > 0)){
    const conso2 = (Number(litre.current.value)*100)/Number(km.current.value);
    setConso(conso2.toFixed(1)) //'5.2'
    }else{
      setConso('')
    }

  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

          <a class="navbar-brand" href="#">
            <i class="fa-solid fa-car me-3"></i>
            Voiture Conso</a>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-4 pt-4">
            <h1 class="h3">Calculer votre consomation</h1>
            <input
              aria-label="Litres"
              class="form-control"
              placeholder="Litres d'essence"
              ref={litre}
              onChange={calcul}
            />

            <input
              aria-label="Taille"
              class="form-control my-3"
              placeholder="Kilomètres"
              ref={km}
              onChange={calcul}
            />


            { conso.length >0 &&
            <div class="alert alert-success mt-4" role="alert">
              <h3>Conso  : <b>{conso}</b> Litres/100km</h3>
              <p>Normal</p>
            </div>
            }
          </div>
        </div>
      </div>
      <footer class="py-5 bg-dark">
        <div class="container px-4 px-lg-5">
          <p class="m-0 text-center text-white">
            Copyright &copy; Seven Valley 2024
          </p>
        </div>
      </footer>
    </>

  )
}
```