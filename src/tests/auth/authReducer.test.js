import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('authReducer', () => {

    let objetoInicial = {logged: false}
    let state  = authReducer ( objetoInicial, {} )
    
    test('debe de retornar el estado por defecto', () => {

        //console.log('state authReducer', state);
        //console.log('objetoInicial', objetoInicial);
        expect (state).toEqual(objetoInicial);
        
    });

    test('debe autenticar y colocar el name del usuario', () => {

        /*
        const state = {
            name: 'fernando',
            logged: true
        }*/

        let objetoMod = {name: 'Nicolas', logged: true}
        let state  = authReducer ( objetoInicial, {type: types.login, payload: objetoMod } )

        //console.log('state reducer luego Add', state);
        //console.log('length', state.length);

        //expect (state.length).toBe(3);
        expect (state).toEqual(objetoMod);

    })
    
    test('debe borrar name y logged en false', () => {
        let objetoMod = {logged: false}
        let state  = authReducer ( objetoInicial, {type: types.logout, payload: objetoMod } )

        //console.log('state reducer luego Add', state);
        //console.log('length', state.length);

        //expect (state.length).toBe(3);
        expect (state).toEqual(objetoMod);
    });

})
