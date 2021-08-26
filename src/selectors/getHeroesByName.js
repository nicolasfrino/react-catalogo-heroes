import { heroes } from "../data/heroes";

export const getHeroesByName = ( name = '' ) => {

    if (name === ''){
        return [];
    }

    name = name.toLowerCase();
    return heroes.filter (heroes => heroes.superhero.toLowerCase().includes(name)) ;
}