import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ChallengeView from './ChallengeView';
import '../styles/Common.css';

const Home = () => {
    const [user, setUser] = useState({});
    const [challenges, setChallenges] = useState([]);
    const [cookie, setCookie] = useCookies(['isah_id']);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUser(response.data);
                setCookie('isah_id', response.data.id, {path: '/', maxAge: 315360000})
            })
            .catch(function (error){
                console.log(error);
            })
    }, [])

    useEffect(() => {
        axios.get('/challenges', {headers: {'Authorization': cookie.isah_id}})
            .then(response => {
                setChallenges(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }, [])

    const renderChallenges = () => {
        return challenges.map(challenge =>
            <div className='col-sm-12 col-md-6 col-lg-4'>
                <Link to={`/challenge/${challenge.id}`}>
                    <ChallengeView 
                    bgcolor={challenge.accentColor} 
                    title={challenge.name}
                    steps={Object.keys(challenge.steps).length}
                    minutes={challenge.minutes}
                    points={challenge.points}
                    />
                </Link>
            </div>
        )
    }
    
    return(
        <React.Fragment>
            <Navbar/>
            <div className='container'>
                <div className='my-container'>
                    <h1 className='h1-black'>Lets fill this world with positivity</h1>
                    <br></br>
                    <h5>Nominate your friends to complete these challenges:</h5>
                    <div className='row mt-2 mb-2'>
                        {renderChallenges()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;