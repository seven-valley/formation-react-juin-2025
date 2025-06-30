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




# Version 2 avec Type Script
```tsx
// App.tsx
export default function App() {
  const [info, setInfo] = useState<Info>( new Info());

  const calculer = (formData: FormData) => {
    console.log('aaa');
    const poids = formData.get("poids");
    const taille = formData.get("taille");
    const imc = Number(poids) / (Number(taille) * Number(taille));
    const info2: any = new Info();
    
    info2.imc = imc.toFixed(1);
    if (imc < 18.5) {
      info2.tranche = "maigreur";
    } else if (imc < 25) {
      // 18.5 < imc <25
      info2.tranche = "normal";
    } else if (imc < 25) {
      // 25 < imc <30
      info2.tranche = "surpoids";
    } else if (imc < 35) {
      info2.tranche = "obésité";
    } else if (imc < 35) {
      info2.tranche = "obésité";
    } else if (imc <= 40) {
      info2.tranche = "obésité sévère";
    } else if (imc > 40) {
      info2.tranche = "obésité morbide";
    }
    setInfo(info2);
  };
  // la partie jsx ou tsx
  return (
    <div className="container">
      <div className="col-4">
        <form action={calculer}>
          <input
            name="poids"
            placeholder="Poids en kg"
            className="form-control my-2"
            defaultValue="80"
          />
          <input
            name="taille"
            placeholder="Taille en mètre"
            className="form-control my-2"
            defaultValue="1.8"
          />

          <button type="submit" className="btn btn-primary">
            <i className="fa fa-plus"></i>
          </button>
        </form>
        { info.imc.length >0 &&
        <>
        <h1>imc :{info.imc}</h1>
        <h2>tranche :{info.tranche}</h2>
        </>
        }
      </div>
    </div>
  );
}
```

## BO Info.ts

```tsx
// ./models/Info.ts
export default class Info{
    public imc: string = '';
    public tranche?: string;
    public poids?: string;
    public taille?: string;
    public classe?: string;

    constructor(
        imc: string = '',
        tranche?: string,
        poids?: string,
        taille?: string,
        classe?: string
    ) {
        this.imc = imc;
        this.tranche = tranche;
        this.poids = poids;
        this.taille = taille;
        this.classe = classe;
    }
}
```


