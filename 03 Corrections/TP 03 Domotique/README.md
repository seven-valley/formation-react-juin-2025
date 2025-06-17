# TP 03 - Domotique

## Partie Java Script

### Appareil.jsx
```jsx
export default function Appareil({ appareil, indice, switchOne }) {

  return (
    <>
      <li className={`list-group-item list-group-item-${appareil.status ? 'success' : 'danger'}`}>
        <h4>{appareil.name}</h4>

        <button
          className={`ml-2 btn btn-${appareil.status ? 'danger' : 'success'}`}
          onClick={() => switchOne(indice)}>
          {appareil.status ? 'OFF' : 'ON'}
        </button>
      </li>
    </>
  )
}
```
### App.jsx
```jsx
import { useState } from 'react';
import Appareil from './models/Appareil';
import Personne from './models/Appareil';
export default function App() {
const [appareils,setAppareils]= useState([
  {name:'PlayStation 5', status:true},
  {name:'Machine à café', status:false},
  {name:'Xbox', status:false}
]);
const ajouter=(e)=>{
  e.preventDefault();
  const a ={name:e.target.nom.value,status:false};
  setAppareils([...appareils,a]);
}
const switchOne=(i)=>{
  const appareils2 = [...appareils];
  appareils2[i].status=!appareils2[i].status;
  setAppareils(appareils2);
}
const switchAll=(etat)=>{
  const appareils2 = [...appareils];
  appareils2.map(a=>a.status=etat);
  setAppareils(appareils2);
}
  return (
    <>
      <div className="container">
        <div className="row">
         
          <div className="col-4">
            <h2>Les Appareils</h2>
            <form method="post" onSubmit={ajouter}>
            <input name="nom" className="form-control" placeholder="Appareil" />
            <button className="btn btn-secondary my-3" type="submit">
              <i className="fa fa-plus"></i>
            </button>
            </form>
            <ul className="list-group">
              {
                appareils.map((a,indice)=><Appareil
                key={indice} 
                appareil={a}
                indice={indice} 
                switchOne={switchOne}
                />)
              }
            </ul>
            <br />
            <button 
            onClick={()=>switchAll(true)}
            className="btn btn-success me-3">ALL ON</button>

            <button
             onClick={()=>switchAll(false)}
            className="ml-2 btn btn-danger">ALL OFF</button>
          </div>
          
        </div>
      </div>
    </>
  )
}
```

## Partie Type script sans bootstrap

### Apppariel.ts
```ts
export class Appareil{
    public name?:string
    public status?:boolean
    constructor( name?:string, status?:boolean){
        this.name = name;
        this.status = status;

    }
}
```

### AppparielComponent.tsx
```tsx
import type { Appareil } from "../models/Appareil";

interface IPropsAppareil{
    appareil:Appareil;
    indice:number;
    changer:(indice:number)=> void;
}
export default function AppareilComponent({appareil,indice,changer}:IPropsAppareil) {
    return(
        <>
        {appareil.name} {appareil.status ? 'ON':'off'} 
        <button onClick={()=>changer(indice)}>changer</button>
        </>
    )
}
```

### App.tsx
```tsx
import { useState } from "react";
import { Appareil } from "./models/Appareil";
import AppareilComponent from "./components/AppareilComponent";



  // interface AjouterFormData {
  //   get(name: string): FormDataEntryValue | null;
  // }
export default function App() {
  const [appareils,setAppareils]= useState<Appareil[]>([]);
  const ajouter = (formData: any): void => {
    
    const appareil = new Appareil(formData.get('nom'))
   // appareils.push(appareil);
    setAppareils([...appareils,appareil]);
  }
  const changer=(indice:number):void=>{
    appareils[indice].status = ! appareils[indice].status
    setAppareils([...appareils])
  }
  const changerTout=(status:boolean)=>{
    appareils.map (a => a.status= status);
    setAppareils([...appareils])
  }
  return (
    <>
     <form action={ajouter}>
      <input name="nom" />
      <button type="submit">ajouter</button>
     </form>
     {
      appareils.map ((a,i)=> <AppareilComponent
      appareil={a}
      indice={i}
      changer={changer}
      key={i}
      />)
     }
     <br />
     <button onClick={()=>changerTout(true)}>ON</button>
     <button onClick={()=>changerTout(false)}>OFF</button>
    </>
  )
}


```


## avec bootstrap
### App.tsx
```tsx
import { useState } from "react";
import { Appareil } from "./models/Appareil";
import AppareilComponent from "./components/AppareilComponent";

// interface AjouterFormData {
//   get(name: string): FormDataEntryValue | null;
// }
export default function App() {
  const [appareils, setAppareils] = useState<Appareil[]>([]);
  const ajouter = (formData: any): void => {
    const appareil = new Appareil(formData.get("nom"));
    // appareils.push(appareil);
    setAppareils([...appareils, appareil]);
  };
  const changer = (indice: number): void => {
    appareils[indice].status = !appareils[indice].status;
    setAppareils([...appareils]);
  };
  const changerTout = (status: boolean) => {
    appareils.map((a) => (a.status = status));
    setAppareils([...appareils]);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Les Appareils</h2>
            <form action={ajouter}>
              <input
                type="text"
                name="nom"
                className="form-control"
                placeholder="Appareil"
              />

              <button className="btn btn-secondary my-3" type="submit">
                <i className="fa fa-plus"></i>
              </button>
            </form>
            <ul className="list-group">
              {appareils.map((a, i) => (
                <AppareilComponent
                  appareil={a}
                  indice={i}
                  changer={changer}
                  key={i}
                />
              ))}
            </ul>
            <br />
            <button
              className="btn btn-success me-3"
              onClick={() => changerTout(true)}
            >
              ALL ON
            </button>

            <button
              className="ml-2 btn btn-danger"
              onClick={() => changerTout(false)}
            >
              ALL OFF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

### AppareilComponent.tsx
```tsx
import type { Appareil } from "../models/Appareil";

interface IPropsAppareil{
    appareil:Appareil;
    indice:number;
    changer:(indice:number)=> void;
}
export default function AppareilComponent({appareil,indice,changer}:IPropsAppareil) {
    return(
        <>
        <li className={`list-group-item list-group-item-${appareil.status ? 'success' : 'danger'}`}>
                <h4>{appareil.name} </h4>
                <button className="btn btn-success me-3" onClick={()=>changer(indice)}>ON</button>

                <button className="ml-2 btn btn-danger" onClick={()=>changer(indice)}>OFF</button>
              </li>
        
        </>
    )
}
```