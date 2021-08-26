import { heroes } from "../data/heroes";

export const getHeroById = ( id ) => {
    return heroes.find (heroes => heroes.id === id) ;
}