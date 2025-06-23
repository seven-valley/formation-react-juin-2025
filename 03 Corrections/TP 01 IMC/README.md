# Correction  TP 1 sans maquette
```jsx
import { useState } from 'react'
import './App.css'

export default function App() {
  const [info,setInfo]= useState({
      imc:'',
      tranche:'',
      // poidsIdeal:'',
      // kilo:'',
      // class:''
    })

  const calcul =(formData)=>{
   
    const poids = formData.get('poids') // string
    const taille = formData.get('taille')
    const info2 ={}
    const imc = poids / (taille * taille) // number
    info2.imc = imc.toFixed(1)
    if (imc < 18.5){
      info2.tranche ='maigreur'
    }
    else if (imc <25){ //18.5 < imc <25
      info2.tranche ='normal'
    }
    else if (imc <30){ 
      info2.tranche ='surpoids'
    }
    else if (imc <35){ 
      info2.tranche ='obésité'
    }
    else if (imc <40){ 
      info2.tranche ='obésité sévère'
    }else if(imc >= 40) {
      info2.tranche ='obésité massive'
    }
    setInfo(info2)
    
  }
  return (
    <>
    <form method="post" onSubmit={calcul}>
      <input name="poids" placeholder='ICI votre poids' defaultValue="80" />
      <input name="taille" placeholder='ICI votre poids' defaultValue="1.8" />
     <button type="submit">GO</button>
    </form>
    { info.imc.length > 0 &&
    <>
    <h1>Votre imc :{info.imc}</h1>
    <h2>{info.tranche}</h2>
    </>
    }
    </>
  )
}
```




# Version 3 avec JS
```jsx
```

