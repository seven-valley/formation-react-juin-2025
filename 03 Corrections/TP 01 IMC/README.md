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

# version 4 JS + couleur

```jsx
import { useState } from 'react'


export default function App() {
  const [info, setInfo] = useState({
    imc: '',
    tranche: 'abc',
    couleur:''
  });
  const calcul = (event) => {
    const info2 = {};

    event.preventDefault()
    const poids = event.target.poids.value;
    const taille = event.target.taille.value;
    event.target.reset(); // vider input
    const imc = parseFloat(poids) / (parseFloat(taille) * parseFloat(taille))
    info2.imc = imc.toFixed(1);
    // definir les tranche
    if (imc < 18.5) {
      info2.tranche = 'maigreur'
      info2.couleur ='danger'
    }
    else if (imc < 25) { // 18.5 < imc <25
      info2.tranche = 'normal'
      info2.couleur ='success'
    }
    else if (imc < 30) {
      info2.tranche = 'surpoids'
      info2.couleur ='warning'
    }
    else if (imc < 35) {
      info2.tranche = 'obésité '
      info2.couleur ='danger'
    }
    else if (imc < 40) {
      info2.tranche = 'obésité massive'
      info2.couleur ='danger'
    } else if (imc > 40) {
      info2.tranche = 'obésité morbide'
      info2.couleur ='primary'
    }
    setInfo(info2);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-weight-scale"></i>
            Calcul IMC</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-4 pt-4">
            <h1 className="h3">Calculer votre IMC</h1>
            <form onSubmit={calcul}>
              <input
                name="poids"
                aria-label="Poids"
                className="form-control"
                placeholder="Poids en kg."
              />

              <input
                name="taille"
                aria-label="Taille"
                className="form-control mt-3"
                placeholder="taille en m."
              />

              <button className="btn btn-success my-3 col-12">
                <i className="fa-solid fa-weight-scale"></i>
              </button>
            </form>
            {info.imc.length > 0 &&
              <div className={`alert alert-${info.couleur} mt-4`} role="alert">
                <h3>{info.imc}</h3>
                <p>{info.tranche}</p>
              </div>
            }


          </div>
        </div>
      </div>





      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <p className="m-0 text-center text-white">
            Copyright &copy; Seven Valley 2023
          </p>
        </div>
      </footer>
    </>



  )
}


```