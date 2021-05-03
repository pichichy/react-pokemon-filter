import { instance } from "../api/pokemonApi";
import { Pokemon, AllPokemon, SmallPokemon } from "../interfaces/AllPokemon";


export const fetchPokemons = async(): Promise<Pokemon[]> => {
    
    const allpokemons = await instance.get<AllPokemon>('/pokemon?limit=1500');

    const smallPokemonsArr = allpokemons.data.results;

    const pokemonArr = getPokemon(smallPokemonsArr);

    //console.log(pokemonArr)

    return pokemonArr;

}

const getPokemon = (smallPokemonsArr: SmallPokemon[]): Pokemon[] => {
    const pokemonArr = smallPokemonsArr.map( poke =>{        
        
        const ulrArr = poke.url.split('/');
        const id = ulrArr[6];

        return {            
            name: poke.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }

    })

    return pokemonArr;

} 


