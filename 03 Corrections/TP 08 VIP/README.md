# TP 05 liste VIP
- Créer une base real Time dans FireBase
- Ajouter une personne
- Afficher la liste des personnes
- Enlever une personne
- Modifier une personne avec PATCH

```js
const personne ={
  prenom:'Brad',
  nom:'PITT'
  status:true
}
```

# TrPersonne.jsx
```jsx
export default function TrPersonne({personne,indice,modifier,enlever}) {
    return (
        <tr className={`${personne.status ? 'table-danger' :'table-success'}`}>
            <td>{personne.prenom}</td>
            <td>{personne.nom}</td>
            <td>
                <button 
                onClick={()=>enlever(indice)}
                className="btn btn-danger">
                    <i className="fa fa-trash"></i>
                </button>
            </td>

            <td>
                <button 
                onClick={()=>modifier(indice)}
                className="btn btn-warning">
                    <i className="fa fa-check"></i>
                </button>
            </td>
        </tr>
    )
}
```

# App.jsx :
```jsx
import axios from 'axios';
import { useEffect, useState } from 'react'
import TrPersonne from './components/TrPersonne';


function App() {
  const [personnes, setPersonnes] = useState([])
  const db = 'https://ib-vip-default-rtdb.europe-west1.firebasedatabase.app/'
  const noeud = 'personnes';
  const loadPersonne = async () => {
    const url2 = `${db}${noeud}.json`
    const response = await axios.get(url2)
    const liste = response.data
    const personnes2 = []
    for (let id in liste) {
      const p = liste[id]
      p.id = id
      personnes2.push(p)
    }
    console.log(personnes2)
    setPersonnes(personnes2)
  }
  useEffect(() => {
    loadPersonne();
  },[])
  const ajouter = async (formData) => {
    const prenom = formData.get('prenom')
    const nom = formData.get('nom')
    const p = { prenom: prenom, nom: nom ,status:true}
    const url2 = `${db}${noeud}.json`
    const response = await axios.post(url2,p)
    const id = response.data.name
    p.id =id
    console.log(p)
    setPersonnes([...personnes,p])
  }
  const modifier = async(indice)=>{
    const id = personnes[indice].id;
    const p = {status:!personnes[indice].status }
    console.log(p)
     const url2 = `${db}${noeud}/${id}.json`
     console.log(url2)
     const response = await axios.patch(url2,p)
     console.log(response.data)
     personnes[indice].status = !personnes[indice].status
     setPersonnes([...personnes])
  }
  const enlever = async(indice)=>{
    const id = personnes[indice].id;
     const url2 = `${db}${noeud}/${id}.json`
      console.log(url2)
     const response = await axios.delete(url2)
     personnes.splice(indice,1)
     setPersonnes([...personnes])
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-martini-glass-citrus me-4"></i>
            VIP Cocktail</a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="bg-gris p-4">
              <form action={ajouter}>
              <div className="row">
                <div className="col-4">
                  <input
                    aria-label="Nom"
                    className="form-control"
                    placeholder="Nom"
                    name="nom"
                  />
                </div>
                <div className="col-4">
                  <input
                    aria-label="Prenom"
                    className="form-control"
                    placeholder="prenom"
                    name="prenom"
                  />
                </div>
                <div className="col-1">
                  <button className="btn btn-success" type="submit">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-4">

            <table className="table table-striped mt-4">
              <tbody>


                <tr>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th colSpan="2">Actions</th>
                </tr>

                {
                  personnes.map((p,i)=><TrPersonne 
                  personne={p}
                  indice={i}
                  key={i}
                  modifier={modifier}
                  enlever={enlever}
                  />)
                }

              </tbody>
            </table>
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

export default App

```

