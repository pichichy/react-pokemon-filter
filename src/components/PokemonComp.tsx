import React, { useState } from 'react'
import { usePokemon } from '../hooks/usePokemon';
import { Pokemon } from '../interfaces/AllPokemon';


const PokemonComp = () => {

    const {loading, pokemons} = usePokemon();
    const [current, setCurrent] = useState(0);
    const [search, setSearch] = useState('');


    const next=() =>{
        if(pokemons.filter( poke => poke.name.includes(search)).length > current +5)
        setCurrent(current + 5);
    }

    const prev=() =>{
        if(current >0 )
        setCurrent(current - 5);
    }

    const filterPokemons = ( pokemons: Pokemon[]): Pokemon[] =>{

        if (search.length === 0)            
            return pokemons.slice(current, current + 5);
                
        const pokemonsFilter = pokemons.filter(poke => poke.name.includes(search));
        return pokemonsFilter.slice(current, current + 5);

    }

    const onSearch = ({target}:React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(target.value);
        setCurrent(0);
    }

    return (
        <div>
            <h1>Pokemon</h1>
            <hr/>
            <div className = "mb-2">

                <input 
                className="mb-2 form-control" 
                placeholder="Buscar Pokemon"
                value={search} 
                onChange={onSearch}
                >                
                </input>

                <button type="button" className="btn btn-primary" onClick= {prev}>Previo</button>
                &nbsp;
                <button type="button" className="btn btn-primary" onClick= {next}>Siguiente</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        filterPokemons(pokemons).map( (poke) =>{
                            return(
                                <tr key={poke.name}>
                                    <td>{poke.id}</td>
                                    <td>{poke.name}</td>
                                    <td>
                                        <img src={poke.image} alt={poke.name} className=""></img>
                                    </td>
                                    </tr>                                
                                    )
                                
                        })                   
                    }               

                </tbody>
            </table>

            {
                 loading && (
                        <div className="alert alert-info">
                            <p>Is loading...</p>
                        </div>
                    )                                
            }
        </div>
    )

   

    
}

export default PokemonComp;
