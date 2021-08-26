import { mount } from "enzyme"
import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


describe('NavBar', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }

    const contextValues = {
        dispatch: jest.fn(),
        user: {
            name: 'Nicolas',
            logged: true
        }
        
    }

    const wrapper = mount(
            <AuthContext.Provider value={contextValues}>
                <MemoryRouter>
                    <Router history={historyMock}>
                        <Navbar />
                    </Router>
                </MemoryRouter>
            </AuthContext.Provider>
    );


    afterEach( () => {
        jest.clearAllMocks();
    }
    )

    test('debe mostar correctamente con login', () => {
      
        expect (wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValues.user.name);
    })
    
    test('debe mostar llamar logout y usar el history', () => {
      
        wrapper.find('button').prop('onClick')();
        expect(contextValues.dispatch).toHaveBeenCalledWith({ type: types.logout });
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })
    
})
