import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Pruebas en Search', () => {
    
    test('Mostrar valores por defecto', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <Route exact path="/search" component= { SearchScreen} />
            </MemoryRouter>
        );

        expect (wrapper).toMatchSnapshot();
        expect (wrapper.find('.alert-info').text().trim()).toBe('Buscar un Heroe');

    })
    
    test('Mostrar a batman y el input con el valor de qstring', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route exact path="/search" component= { SearchScreen} />
            </MemoryRouter>
        );

        expect (wrapper.find('input').prop('value')).toBe('batman');
        expect (wrapper).toMatchSnapshot();


    })

    test('Mostar error si no es encuentra el hero', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route exact path="/search" component= { SearchScreen} />
            </MemoryRouter>
        );

        expect (wrapper.find('input').prop('value')).toBe('batman123');
        expect (wrapper.find('.alert-danger').text().trim()).toBe('no hay heroe con valores: batman123');
        

    })

    test('debe llamar al push del history', () => {
        
        const historyMock = {
            push: jest.fn()
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    exact path="/search" 
                    component= { () => <SearchScreen history={historyMock}/> } 

                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change',{
            target: {
                name: 'searchText',
                value: 'batman'
                }
            }
        );

        wrapper.find('form').simulate('submit',{
                preventDefault() {}
            }
        );

        //wrapper.find('form').prop('onSubmit')( {
        //    preventDefault() {}
        //});

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman')

    })

})
