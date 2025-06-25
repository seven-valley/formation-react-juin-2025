# Correction Partie 1

## TrSearch.jsx
```jsx
export default function TrSearch({serie,indice,ajouter}) {
    return (
        <tr>
            <td>{serie.Title}</td>
            <td>{serie.Year}</td>
           
            <td>
                <img
                    src={serie.Poster}
                    alt={serie.Title}
                    width="80"
                />
            </td>
            <td className="align-middle">
                <button className="btn btn-outline-secondary" onClick={()=> ajouter(indice)}>
                    <i className="fa fa-plus"></i>
                </button>
            </td>
        </tr>
    )
}
```
## TrFav.jsx
```jsx
export default function TrFav({serie,indice,enlever}) {
    return (
        <tr>
            <td>{serie.Title}</td>
            <td>{serie.Year}</td>
            <td>{serie.imdbRating}</td>
            <td>
                <img
                    src={serie.Poster}
                    alt={serie.Title}
                    width="80"
                />
            </td>
            <td className="align-middle">
                <button className="btn btn-outline-danger" onClick={()=>enlever(indice)}>
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}
```
## App.jsx
```jsx
import { useEffect, useState } from "react";
import TrSearch from "./components/TrSearch";
import TrFav from "./components/TrFav";


export default function App() {
  const [series, setSeries] = useState([])
  const [favories, setFavories] = useState([]);
  const key = 'efdc2275';
  const url = `http://www.omdbapi.com/?apikey=${key}`;
  useEffect(()=>{
    const data = localStorage.getItem('favories');
    if (data){
      setFavories(JSON.parse(data));
    }
  },[])
  const recherche = async (formData) => {
    console.log('go');
    const titre = formData.get('titre')
    const url2 = `${url}&s=${titre}&type=series`
    console.log(url2)
    const response = await fetch(url2);
    const data = await response.json();
    setSeries(data.Search);
    console.log(series);
  }
  // async ???
  const ajouter = async (indice) => {
    const imdbId = series[indice].imdbID;

    const url2 = `${url}&i=${imdbId}`
    const response = await fetch(url2);
    const film = await response.json();
    favories.push(film);
    setFavories([...favories])
    series.splice(indice, 1);
    setSeries([...series]);
    localStorage.setItem('favories',JSON.stringify(favories))
  }
  const enlever =(indice)=>{
    favories.splice(indice, 1);
    setFavories([...favories]);
    localStorage.setItem('favories',JSON.stringify(favories))
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <a className="navbar-brand" href="#">
            <i className="fa-solid fa-rocket me-4"></i>
            Mes séries</a>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-4">
            <form action={recherche}>
              <div className="row">
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la série"
                    name="titre"
                    defaultValue="star"
                  />
                </div>
                <div className="col-2">
                  <button className="btn btn-success" type="submit">

                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Séries</th>
                  <th>Année</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {series &&
                  series.map((serie, indice) =>
                    <TrSearch
                      serie={serie}
                      indice={indice}
                      ajouter={ajouter}
                      key={serie.imdbID}
                    />)
                }
              </tbody>
            </table>
          </div>
          <div className="offset-3 col-4">
            <h1>Séries à regarder :</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Séries</th>
                  <th>Année</th>
                  <th>rating</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {favories &&
                  favories.map((f, indice) =>
                    <TrFav
                      serie={f}
                      indice={indice}
                      enlever={enlever}
                      key={f.imdbID}
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
            Copyright &copy; Seven Valley 2024
          </p>
        </div>
      </footer>
    </>

  )
}
```

