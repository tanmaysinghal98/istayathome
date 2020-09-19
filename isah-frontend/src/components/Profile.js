import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Common.css';
import '../styles/Profile.css';

const Profile = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [user, setUser] = useState({});
    const [cookie, setCookie] = useCookies(['auth']);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                setUser(response.data);
                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setPhoneNumber(response.data.phoneNumber || '')
                setCookie('auth', response.data.id, {path: '/', maxAge: 315360000});
            })
            .catch(function (error){
                console.log(error);
            })
    }, [])

    const onSubmitHandler = () => {
        let data = {
            'id': user.id,
            'name': name,
            'email': email,
            'phoneNumber': phoneNumber
        }
        axios.put('/users', data, {headers: {'Authorization': cookie.isah_id}})
            .then(response => {
                setUser(response.data);
                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setCookie('isah_id', response.data.id, {path: '/', maxAge: 315360000});
                props.history.push('/');
            })
            .catch(function (error){
                console.log(error);
            })
    }

    return(
        <React.Fragment>
            <Navbar/>
            <div className='container'>
                <div className='my-container'>
                    <div className='row justify-content-md-center mt-4 mb-4'>
                        <div className='col-sm-12 col-md-6 account-row'>
                            <h1 className='h1-black'>Account Setting</h1>
                        </div>
                    </div>
                    <div className='row justify-content-md-center mt-4 mb-2'>
                        <div className='col-sm-12 col-md-6'>
                            <h5 className='label'>Name</h5>
                            <input
                            type='text'
                            className='input-field-large'
                            placeholder='Enter Your Name' 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row justify-content-md-center mt-4 mb-2'>
                        <div className='col-sm-12 col-md-6'>
                            <h5 className='label'>Phone Number</h5>
                            <input
                            type='text'
                            className='input-field-large'
                            placeholder='Enter Your Phone Number' 
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row justify-content-md-center mt-2 mb-4'>
                        <div className='col-sm-12 col-md-6 account-row'>
                            <h5 className='label'>Email</h5>
                            <input
                            type='text'
                            className='input-field-large'
                            placeholder='Enter Your Email ID'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row justify-content-md-center mt-4 mb-4'>
                        <div className='col-sm-12 col-md-6 text-center'>
                            <button className='button-rounded-black text-large' onClick={onSubmitHandler}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;