import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
//import { heroes } from '../../data/heroes'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import queryString from 'query-string';
import { getHeroesByName } from '../../selectors/getHeroesByName';



export const SearchScreen = ( { history} ) => {

    const location = useLocation();
    //console.log('location', location);
    const {q = ''} = queryString.parse(location.search);
    //console.log('q', q);



    const [formValues, handleInputChange] = useForm({
        searchText: q
    })

    const { searchText } = formValues;

    //    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher ]);
    const heroFiltered = useMemo(() => getHeroesByName(q), [q]);

/* aca el curso me pude que use el memo, no se puede usar el efec?
    useEffect(() => {
        //console.log('searchText cambio');
        return () => {
        }
    }, [searchText]);
*/

    const handleSearch = (e) => {
        e.preventDefault();

        //console.log(history);
        history.push(`?q=${ searchText }`)
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>

            <div className="row">

                <div className="col-5">
                    <h4>SearchForm</h4>
                    <form onSubmit={handleSearch}>
                        <input  type="text"
                                name="searchText"
                                autoComplete="off"
                                value= {searchText}
                                placeholder="Busca tu Heroe"
                                className="find-control"
                                onChange={handleInputChange}
                        />
                        <button type="submit"
                                className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    { (q === '')
                        &&
                        <div className="alert alert-info">
                            Buscar un Heroe
                        </div>
                    }
                    { (q !== '' && heroFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            {`no hay heroe con valores: ${ q }`}
                        </div>
                    }
                    {
                        heroFiltered.map( heroRet => ( <HeroCard key={heroRet.id} {...heroRet}/> ))
                    }
                </div>

            </div>

        </div>

    )
}
