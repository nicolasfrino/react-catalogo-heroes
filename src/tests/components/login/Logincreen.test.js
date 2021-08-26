import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('LoginScreen', () => {
    
    const contextValues= {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
        
    }

    const history = {
        replace: jest.fn()
    }

    const wrapper = mount (
        <AuthContext.Provider value={contextValues}>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    )

    test('debe mostarse correctamente', () => {
        
        expect (wrapper).toMatchSnapshot();

    })
    
    test('debe realizar dispatch y navegacion', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValues.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Nicolas'
            }
        })

        expect (history.replace).toHaveBeenCalled();
        expect (history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');
        handleClick();

        expect (history.replace).toHaveBeenCalledWith('/dc');



    })

})
