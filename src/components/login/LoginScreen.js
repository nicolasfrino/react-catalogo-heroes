import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ( { history }) => {

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        //console.log('history', history);
        //history.push('/'); //uno deja navegar para atras y el otro como que pirde la historia
        //history.replace('/');

        const lastPath = localStorage.getItem('lastPath') || '/';


        dispatch ({
            type: types.login,
            payload: {
                name: 'Nicolas'
            }
        })

        history.replace(lastPath);


    };

    return (
        <div className='container mt-5'>
            <h1>LoginScreen</h1>
            <hr />

            <button className='btn-primary'
                    onClick= { handleLogin }
            >
                Login
            </button>
        </div>
    )
}
