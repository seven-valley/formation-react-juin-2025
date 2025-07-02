# TP 07 Liste de séries

## TrSearch.tsx
```jsx
type TpropsSearch={
    indice:number;
    serie:any;
    ajouterfav:(indice:number)=> void
}
export default function TrSearch(props:TpropsSearch) {
    return (
        <tr>
            <td>{props.serie.Title}</td>
            <td>{props.serie.Year}</td>
            <td>
                <img
                    src={props.serie.Poster}
                    alt="Upload"
                    width="80"
                />
            </td>
            <td className="align-middle">
                <button 
                    onClick={()=>props.ajouterfav(props.indice)}
                    className="btn btn-outline-secondary">
                    <i className="fa fa-plus"></i>
                </button>
            </td>
        </tr>
    )
}
```
## TrFav.tsx
```jsx
type TpropsFav={
    indice:number;
    serie:any;
    enleverfav:(indice:number)=> void
}
export default function TrFav(props:TpropsFav) {
    return (
        <tr>
            <td>{props.serie.Title}</td>
            <td>{props.serie.Year}</td>
            <td>{props.serie.imdbRating}</td>
            <td>
                <img
                    src={props.serie.Poster}
                    alt="Upload"
                    width="80"
                />
            </td>
            <td className="align-middle">
                <button 
                    onClick={()=>props.enleverfav(props.indice)}
                    className="btn btn-outline-danger">
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}
```
## App.tsx
```jsx
import { useEffect, useState } from 'react';
import TrSearch from './components/TrSearch';
import TrFav from './components/TrFav';
export default function App() {
  const [series,setSeries] = useState<any[]>([]);
  const [tabFav,setTabFav] = useState<any[]>([]);
  const key = 'efdc2275';
  
  // http://www.omdbapi.com/?apikey=efdc2275&t=upload&type=series
  const url = `http://www.omdbapi.com/?apikey=${key}&type=series`; 
  useEffect(() => {
    const data = localStorage.getItem('tabFav');
    if(data){
      setTabFav(JSON.parse(data));
    }
  },[])
  
  const getSerie=async(id:string): Promise<any> =>{
    const url2 =`${url}&i=${id}`
    const response = await fetch(url2)
    const serie = await response.json() 
    return serie;
  }

  const ajouter = async(formData:FormData) => {
    const nom = formData.get('nom');
    const url2 =`${url}&s=${nom}`
 
    const response = await fetch(url2)
    const data = await response.json()   
    setSeries(data.Search)
  }
  const ajouterfav = async(i:number) => {
    console.log(i);
    const tabFav2 = [...tabFav];
    // envouyer une imdb avec Fetch
    const serie =await getSerie(series[i].imdbID);
    console.log(serie);
    tabFav2.push(serie);
    const series2 = [...series];
    series2.splice(i,1);
    setSeries(series2);
    console.log(tabFav2)
    setTabFav(tabFav2);
    localStorage.setItem('tabFav',JSON.stringify(tabFav2));
  }
  const enleverfav = async(i:number) => {
    
    const tabFav2 = [...tabFav];
    // envouyer une imdb avec Fetch
    tabFav2.splice(i,1)
    setTabFav(tabFav2);
    localStorage.setItem('tabFav',JSON.stringify(tabFav2));
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
          <form  action={ajouter}>
          <div className="row">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                placeholder="Nom de la série"
                name="nom"
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
              {
              series.map((serie,i)=><TrSearch 
              key={i} 
              indice={i}
              serie={serie}
              ajouterfav={ajouterfav}
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
            {
              tabFav.map((serie,i)=><TrFav 
              key={i} 
              indice={i}
              serie={serie}
              enleverfav={enleverfav}
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

