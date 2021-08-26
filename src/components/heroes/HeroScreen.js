import React, { useMemo} from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';
//import batman from '../../assets/heroes/dc-batman.jpg' //contenido estatico

//const pathImages = '../../assets/heroes/';
//const heroImages = require.context('../../assets/heroes', true); //context web pack

export const HeroScreen = ( {history} ) => {

    const {heroeId} =  useParams ();
    //console.log('heroeId', heroeId)

    //const hero = getHeroById(heroeId);
    const hero = useMemo(() => getHeroById(heroeId), [heroeId ]);


    //console.log('hero', hero)

    if (!hero) {
        return <Redirect to="/"/>
    }

    const handleReturn = () => {
        //console.log( 'history', history);

        if (history.length <= 2)
        {
            history.push('/');
        }else{
            history.goBack();
        }



    };

    const {
        superhero			,
        publisher			,
        alter_ego			,
        first_appearance	,
        characters			
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img    
                        src={  `../../assets/heroes/${ heroeId }.jpg` }  //desde public/asset
                        //src={  `./../assets/heroes/${ heroeId }.jpg`.default }  //desde public/asset
                        //src={batman} //contenido estatico
                        //src={  (heroImages(`./${ heroeId }.jpg`).default) } //context web pack
                        alt={superhero}
                        className="img-thumbnail  animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> {superhero} </h3>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item"> <b> Alter Ego: </b>{ alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b>{ publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b>{ first_appearance } </li>

                </ul>

                <h5> Characters </h5>
                <p>  { characters }   </p>

                <button className="btn btn-outline-info"
                        onClick={handleReturn}
                >
                    Return
                </button>

            </div>

        </div>
    )
}
