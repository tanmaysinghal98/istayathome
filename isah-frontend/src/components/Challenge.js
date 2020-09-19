import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import StepsView from './StepsView';
import ImageUpload from './ImageUpload';
import ImageShare from './ImageShare';
import { useCookies } from 'react-cookie';
import '../styles/Common.css';
import '../styles/Challenge.css';

const Challenge = (props) => {
    const [challenge, setChallenge] = useState({});
    const [user, setUser] = useState({});
    const [cookie, setCookie] = useCookies(['isah_id']);

    useEffect(() => {
        console.log(cookie.isah_id);
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
        axios.get('/challenges?id=' + props.match.params.id, {headers: {'Authorization': cookie.isah_id}})
            .then(response => {
                setChallenge(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }, [props])

    const share = () => {
        navigator.share({
            text: 'I nominate you to complete this challenge. https://istayathome.in/challenge/' + challenge.id
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log(error));
    }

    return(
        <React.Fragment>
            <Navbar bgcolor={challenge.accentColor}/>
            <div className='container-fluid' style={{background : challenge.accentColor}}>
                <div className='top-bar'>
                    <div className='justify-content-start'>
                        <Link to={'/'}>
                        <div className='row h-100 align-items-center'>
                            <div className='col d-none d-sm-block'>
                                <button className='button-rounded-transparent'>
                                    <span className='mr-3'><i className="fas fa-arrow-left"></i></span>
                                    Back
                                </button>
                            </div>
                            <div className='col d-xs-block d-sm-none'>
                                    <span className='mr-3'><i className="fas fa-arrow-left text-light"></i></span>
                            </div>
                        </div>
                        </Link> 
                    </div>
                    <div className='justify-content-end'>
                        <div className='row h-100 align-items-center'>
                            {/* <div className='col d-none d-sm-block'>
                                <button className='button-rounded-transparent'>
                                    <span className='mr-3'><i className="fas fa-share"></i></span>
                                    Nominate
                                </button>
                            </div> */}
                            <div className='col d-xs-block d-sm-none' onClick={share}>
                                <span className='mr-3'><i className="fas fa-share text-light"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-md-center description-box'>
                    <div className='col-sm-12 col-md-6'>
                    <h1 className='h1-white'>{challenge.name}</h1>
                    <p className='description-text'>{challenge.description}</p>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='my-container'>
                    <StepsView challenge={challenge}/>
                    <hr></hr>
                    {(user.challengesCompleted || []).some(compChal => compChal.challengeId === challenge.id) ? 
                    <ImageShare challenge={challenge} user={user} />: 
                    <ImageUpload challenge={challenge} onUpload={user => setUser(user)}/>
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

export default Challenge;