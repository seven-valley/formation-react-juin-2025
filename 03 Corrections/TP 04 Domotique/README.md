# TP 03 - Domotique

```
|-- src
        |-- models
            |-- Apppareil.js
```

## Appareil.js
```jsx
export default class Appareil{
    constructor(name){
        this.name= name
        this.status = true
    }
}
```

```
|-- src
        |-- components
            |-- ApppareilComponents.jsx
```

## AppareilComponent.js
```jsx
export default function AppareilComponent({appareil,indice,switchOne}) {
    return (
        <li className={`list-group-item list-group-item-${appareil.status ? 'success' :'danger'}`}>
            <h4>{appareil.name} -- {appareil.status ? 'Allumé' :'Eteint'}</h4>

            <button 
            className={`btn btn-${appareil.status ? 'danger' :'success'} me-3`} 
            onClick={()=>switchOne(indice)}>
                {appareil.status ? 'OFF' :'ON'}
                </button>

            
        </li>
    )
}
```

## App.jsx
```jsx
import { useEffect, useState } from "react";
import AppareilComponent from "./components/AppareilComponent";
import Appareil from "./models/Appareil.js";


export default function App() {
  const [appareils,setAppareils]= useState([]);
  useEffect(()=>{
    console.log('useEffect');
    const a = new Appareil('PlayStation 5');
    const appareils2 =[]
    appareils2.push(a);
    setAppareils(appareils2)
  },[])
  const ajouter = (formData) => {
    const nom = formData.get('nom');
    const appareil = new Appareil(nom);
    console.log(appareil);
    setAppareils([...appareils,appareil])
  }
  const switchOne=(indice)=>{
    appareils[indice].status =  !appareils[indice].status
    setAppareils([...appareils])
  }
  const switchAll=(status)=>{
   appareils.map(a => a.status =status);
   setAppareils([...appareils])
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Les Appareils</h2>
            <form action={ajouter}>
              <input 
              type="text" 
              className="form-control" 
              placeholder="Appareil"
              name="nom"
              />
              <button className="btn btn-secondary my-3" type="submit">
                <i className="fa fa-plus"></i>
              </button>
            </form>
            <ul className="list-group">
              {
              appareils.map((appareil,i)=><AppareilComponent
              appareil={appareil}
              indice={i}
              switchOne={switchOne}
              key={i}
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