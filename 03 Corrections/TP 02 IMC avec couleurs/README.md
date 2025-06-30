# TP 02 IMC avec couleur

```jsx
import { useState } from 'react'
import './App.css'

export default function App() {
  const [info, setInfo] = useState({
    imc: '',
    tranche: '',
    // poidsIdeal:'',
    // kilo:'',
    class: ''
  })

  const calcul = (formData) => {

    const poids = formData.get('poids') // string
    const taille = formData.get('taille')
    const info2 = {}
    const imc = poids / (taille * taille) // number
    info2.imc = imc.toFixed(1)
    if (imc < 18.5) {
      info2.tranche = 'maigreur'
      info2.class = 'danger'
    }
    else if (imc < 25) { //18.5 < imc <25
      info2.tranche = 'normal'
      info2.class = 'success'
    }
    else if (imc < 30) {
      info2.tranche = 'surpoids'
      info2.class = 'warning'
    }
    else if (imc < 35) {
      info2.tranche = 'obésité'
      info2.class = 'danger'
    }
    else if (imc < 40) {
      info2.tranche = 'obésité sévère'
      info2.class = 'secondary'
    } else if (imc >= 40) {
      info2.tranche = 'obésité massive'
      info2.class = 'primary'
    }
    setInfo(info2)

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-weight-scale me-3"></i>
            Calcul IMC</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-4 pt-4">
            <h1 className="h3">Calculer votre IMC</h1>
            <form action={calcul}>
              <input
                aria-label="Poids"
                className="form-control"
                placeholder="Poids en kg."
                name="poids"
              />

              <input
                aria-label="Taille"
                className="form-control mt-3"
                placeholder="taille en m."
                name="taille"
              />

              <button className="btn btn-primary my-3 col-12">
                <i className="fa-solid fa-weight-scale"></i>
              </button>
            </form>

            { info.imc.length > 0 &&


              <div className={`alert alert-${info.class} mt-4" role="alert`}>
                <h3>IMC : {info.imc}</h3>
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


# Coorection avec poids Idéal et kg à perdre
```jsx
import { useState } from 'react'
import './App.css'

export default function App() {
  const [info, setInfo] = useState({
    imc: '',
    tranche: '',
    poids:'',
    kilo:'',
    class: ''
  })

  const calcul = (formData) => {

    const poids = formData.get('poids') // string
    const taille = formData.get('taille')
    const info2 = {
      poids:'',
      kilo:''
    }
    const imc = poids / (taille * taille) // number
    info2.imc = imc.toFixed(1)
    if (imc > 25) {
      const poidsIdeal = 25 * parseFloat(taille) * parseFloat(taille);
      const kilo = poidsIdeal - parseFloat(poids);
      info2.kilo = kilo.toFixed(1);
      info2.poids = poidsIdeal.toFixed(1);
    }
    if (imc < 18.5) {
      const poidsIdeal = 18.5 * parseFloat(taille) * parseFloat(taille);

      const kilo = poidsIdeal - parseFloat(poids);
      //info.kilo = '+'+kilo.toFixed(1);
      info2.kilo = `+ ${kilo.toFixed(1)}`;
      info2.poids = poidsIdeal.toFixed(1);
      info2.tranche = 'maigreur'
      info2.class = 'danger'
    }
    else if (imc < 25) { //18.5 < imc <25
      info2.tranche = 'normal'
      info2.class = 'success'
    }
    else if (imc < 30) {
      info2.tranche = 'surpoids'
      info2.class = 'warning'
    }
    else if (imc < 35) {
      info2.tranche = 'obésité'
      info2.class = 'danger'
    }
    else if (imc < 40) {
      info2.tranche = 'obésité sévère'
      info2.class = 'secondary'
    } else if (imc >= 40) {
      info2.tranche = 'obésité massive'
      info2.class = 'primary'
    }
    setInfo(info2)

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-weight-scale me-3"></i>
            Calcul IMC</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-4 pt-4">
            <h1 className="h3">Calculer votre IMC</h1>
            <form action={calcul}>
              <input
                aria-label="Poids"
                className="form-control"
                placeholder="Poids en kg."
                name="poids"
              />

              <input
                aria-label="Taille"
                className="form-control mt-3"
                placeholder="taille en m."
                name="taille"
              />

              <button className="btn btn-primary my-3 col-12">
                <i className="fa-solid fa-weight-scale"></i>
              </button>
            </form>

            {info.imc.length > 0 &&


              <div className={`alert alert-${info.class} mt-4" role="alert`}>
                <h3>IMC : {info.imc}</h3>
                <p>{info.tranche}</p>
                {info.kilo.length > 0 &&
                  <h4>objectif :{info.poids} kg ({info.kilo})</h4>
                }
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