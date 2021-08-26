import { mount } from "enzyme"
import React from "react";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";


describe('AppRouter', () => {

    test('Muestro login si no estoy autenticado', () => {
        

        const contextValues= {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
            
        }

        const wrapper = mount (
            <AuthContext.Provider value={contextValues}>
                <AppRouter />
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());
        expect (wrapper).toMatchSnapshot();
        //aca hay que mriar si esta el login el componente

    })
    
    test('Muestro lastVisti si estoy autenticado', () => {

        const contextValues= {
            dispatch: jest.fn(),
            user: {
                name: 'Nicolas',
                logged: true
            }
            
        }

        const wrapper = mount (
            <AuthContext.Provider value={contextValues}>
                <AppRouter />
            </AuthContext.Provider>
        );

        //console.log(wrapper.html());
        expect (wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);

        
    })

})
