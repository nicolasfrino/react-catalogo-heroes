import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";


describe('DashboardRoutes', () => {
    test('probar que se dibuje ok', () => {
        

        const contextValues= {
            dispatch: jest.fn(),
            user: {
                name: 'Nicolas',
                logged: true
            }
            
        }


        const wrapper = mount (

            <MemoryRouter>
                <AuthContext.Provider value={contextValues}>
                    <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
        ); 

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Nicolas');


/*
        <span
          className="nav-item nav-link text-info"
        >
          Nicolas
        </span>
*/


    })
    
})
