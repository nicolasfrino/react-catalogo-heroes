import { mount } from "enzyme"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { PrivateRoute } from "../../routers/PrivateRoute"

describe('Private Route', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('Debe mostar componente si esta autentificado y guardar local storage', () => {
        
            /*       
            
            rest.location.pathname

            export const PrivateRoute = ( {
                isAutenticated,
                component: Component,
                ...rest
            } ) => {
                */

        const wrapper = mount (
            // MemoryRouter: simular un router para poder usar rutas
            <MemoryRouter>
                <PrivateRoute   isAutenticated={true}
                                component= { () => <span>Obj</span> } 
                                {...props}
                />
            </MemoryRouter>
        );

        //console.log('html', wrapper.html());
        expect(wrapper.find('span').exists()).toBe(true)
        expect (localStorage.setItem).toHaveBeenCalledWith('lastPath',props.location.pathname)

    })

    test('Debe bloquar el componente si no esta autenticado', () => {
        
    const wrapper = mount (
        // MemoryRouter: simular un router para poder usar rutas
        <MemoryRouter>
            <PrivateRoute   isAutenticated={false}
                            component= { () => <span>Obj</span> } 
                            {...props}
            />
        </MemoryRouter>
    );

    //console.log('html', wrapper.html());
    expect(wrapper.find('span').exists()).toBe(false)
    expect (localStorage.setItem).toHaveBeenCalledWith('lastPath',props.location.pathname)

})
    

})
