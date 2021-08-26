import { mount } from "enzyme"
import React from "react"
import { MemoryRouter, Route } from "react-router-dom"
import { HeroScreen } from "../../../components/heroes/HeroScreen"

describe('HeroScreen', () => {


    test('debe de mostar el redirect si no hay argumento en la URL', () => {

        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        )

        expect (wrapper).toMatchSnapshot();
        expect (wrapper.find('Redirect').exists()).toBe(true);

    })
    
    
    test('debe de mostar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount (
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route exact path="/hero/:heroeId" component= { HeroScreen } />
            </MemoryRouter>
        )

        expect (wrapper.find('.row').exists()).toBe(true);

    })

    test('debe regresar a la pantalla anterior con push', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    exact path="/hero/:heroeId" 
                    component= { (props) => <HeroScreen history = { historyMock } /> }/>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect (historyMock.push).toHaveBeenCalledWith('/');
        expect (historyMock.goBack).not.toHaveBeenCalled();

    })

    test('debe regresar a la pantalla anterior con goBack', () => {

        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    exact path="/hero/:heroeId" 
                    component= { (props) => <HeroScreen history = { historyMock } /> }/>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect (historyMock.goBack).toHaveBeenCalledWith();
        expect (historyMock.goBack).toHaveBeenCalledTimes(1);

        expect (historyMock.push).not.toHaveBeenCalled();
        expect (historyMock.push).toHaveBeenCalledTimes(0);

    })


    test('debe regresar a la pantalla de redirect si el hero no existe', () => {

        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/hero/marvel-spider1234']}>
                <Route 
                    exact path="/hero/:heroeId" 
                    component= { (props) => <HeroScreen history = { historyMock } /> }/>
            </MemoryRouter>
        )

        expect (wrapper.text()).toBe('');

    })

})
