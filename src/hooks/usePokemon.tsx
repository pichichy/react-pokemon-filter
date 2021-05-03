import { useEffect, useState } from 'react'
import { Pokemon } from '../interfaces/AllPokemon';
import { fetchPokemons } from '../utils/fetchPokemons';

export const usePokemon = () => {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);


    useEffect(() => { 
        fetchPokemons().then( pokemonArr => {
            setPokemons(pokemonArr);
            setLoading(false);

        }

        )
        
    }, []);

    return {
        loading,
        pokemons
    }

}
