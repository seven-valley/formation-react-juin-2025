# TP 02 IMC avec couleur

```jsx
import { useState } from "react";
import Info from "./models/Info";

export default function App() {
  const [info, setInfo] = useState<Info>(new Info());

  const calculer = (formData: FormData) => {
    console.log("aaa");
    const poids = formData.get("poids");
    const taille = formData.get("taille");
    const imc = Number(poids) / (Number(taille) * Number(taille));
    const info2: any = new Info();
    if (imc > 25){
      const poidsIdeal:number = 25 * Number(taille) * Number(taille);
      info2.poids = poidsIdeal.toFixed(1)
      const kilo = Number(poids)  - poidsIdeal;
      info2.kilo = kilo.toFixed(2)

    }
    info2.imc = imc.toFixed(1);
    if (imc < 18.5) {
      info2.tranche = "maigreur";
      info2.classe = "danger";
       const poidsIdeal:number = 18 * Number(taille) * Number(taille);
      info2.poids = poidsIdeal.toFixed(1)
      const kilo = poidsIdeal - Number(poids);
      info2.kilo = '+' +kilo.toFixed(2)
    } else if (imc < 25) {
      // 18.5 < imc <25
      info2.classe = "success";
      info2.tranche = "normal";
    } else if (imc < 25) {
      // 25 < imc <30
      info2.tranche = "surpoids";
      info2.classe = "warning";
    } 
    else if (imc < 35) {
      info2.tranche = "obésité";
      info2.classe = "danger";
    } 
    else if (imc <= 40) {
      info2.tranche = "obésité sévère";
      info2.classe = "secondary";
    } else if (imc > 40) {
      info2.tranche = "obésité morbide";
      info2.classe = "primary";
    }
    console.log(info2);
    setInfo(info2);
  };
  // la partie jsx ou tsx
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-weight-scale"></i>
            Calcul de l'IMC
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-4 pt-4">
            <h1 className="h3">Calculer votre IMC</h1>
            <label htmlFor="poids">Poids en kg.</label>
            <form action={calculer}>
              <input
                aria-label="Poids"
                className="form-control"
                placeholder="Poids en kg."
                defaultValue="80"
                name="poids"
              />
              <label htmlFor="taille" className="mt-3">
                Taille en mètre
              </label>
              <input
                aria-label="Taille"
                className="form-control"
                placeholder="taille en mètre"
                defaultValue="1.8"
                name="taille"
              />

              <button className="btn btn-success my-3 col-12">
                <i className="fa-solid fa-weight-scale"></i>
              </button>
            </form>

      
            {info.imc.length > 0 && (
              <div className={`alert my-3 alert-${info.classe}`}>
                <div>IMC : {info.imc}</div>
                <div>{info.tranche}</div>
               {info.poids.length >0 &&
                <div>
                  objectif {info.poids}kg ({info.kilo}kg){" "}
                </div>
              }
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <p className="m-0 text-center text-white">
            Copyright &copy; Seven Valley 2024
          </p>
        </div>
      </footer>
    </>
  );
}


```

# le bo Info.ts
```tsx
export default class Info{
    public imc: string = '';
    public tranche?: string;
    public kilo?: string;
    public poids: string=''; // objetif de poidsà atteindre
    public classe?: string;

    constructor(
        imc: string = '',
        tranche?: string,
        kilo?: string,
        poids: string='',
        classe?: string
    ) {
        this.imc = imc;
        this.tranche = tranche;
        this.kilo = kilo;
        this.poids = poids;
        this.classe = classe;
    }
}
```