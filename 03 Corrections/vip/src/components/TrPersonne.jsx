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