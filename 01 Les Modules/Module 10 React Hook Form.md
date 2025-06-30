# React Hook form
https://react-hook-form.com/get-started
```
npm install react-hook-form
```
# avant
```jsx

export default function App() {
  
  const valider =(formData)=>{
   
   const prenom = formData.get('nom');
   const nom = formData.get('prenom');
   console.log(prenom)
   console.log(nom)
   
  }
  return (
    <>
      <form method="post" action={valider} >
        <input name="prenom"/>
        <br /><br />
        <input name="nom" />
        <button type="submit">GO</button>
      </form>
      
    </>
  )
}
```



# apres
```tsx

```


# La gestion des erreurs
```tsx
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const valider=  handleSubmit((data)=>{
    console.log(data);
    console.log(data.prenom);
    console.log(data.nom);
  })
  return (
    <>
      <div className="container">
        <div className="col-4">
          <form onSubmit={valider}>
            <input
              {...register("prenom",{ required :'Veuillez remplir ce champs'})}
              type="text"
              placeholder="Prénom"
              className={`form-control mt-3 ${errors.prenom && 'is-invalid'}`} />
            
            <div className="invalid-feedback">
              { errors.prenom && errors.prenom.message}
            </div>
            <input
              {...register("nom",{
                required:'Veuillez remplir ce champs',
                minLength:{value:3,message:'plus de 3 caractères'},
                pattern :{ value:/^[A-Za-z]+$/i, message:'svp pas de chiffres'}
              })}
              type="text"
              placeholder="Nom"
              className={`form-control mt-3 ${errors.nom && 'is-invalid'}`}
            />
             <div className="invalid-feedback">
              { errors.nom && errors.nom.message}
            </div>
            <button type="submit" className="btn btn-primary mt-3"> Valider </button>
          </form>
        </div>
      </div>
    </>

  )
}
```



