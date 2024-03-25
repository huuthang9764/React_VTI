import React, { useState } from 'react';
import './Login.scss'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login, selectCurrentUser } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const currentUser = useSelector(selectCurrentUser)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const handleUsernameChange = e => {
        const { value } = e.target;
        setUsername(value);
        setValidUsername(value.trim() !== '');
    }

    const handlePasswordChange = e => {
        const { value } = e.target;
        setPassword(value);
        setValidPassword(value.trim() !== '');
    }


    const confirmLogin = async (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))

    };

    if (currentUser?.role === "ADMIN") {
        return <Navigate to="/admin/users" />;
    } else if (currentUser?.role === "USER") {
        return <Navigate to="/admin" />;
    }
    return (
        <div className='login-form container d-flex justify-content-center mt-5'>
            <div className='row'>
                <div className='content'>
                    <div className='title-content my-5'>
                        <h3 className='d-flex justify-content-center'>Login</h3>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                    <form>
                        <div className='mt-3'>
                            {/* <input type="email" 
                            
                            value={login.username|| ''}
                            name='username'
                            onChange={handleInputChange}
                            placeholder='Username' /> */}
                            <input
                                type="text"
                                className={validUsername ? 'form-control' : 'form-control is-invalid'}
                                placeholder="username"
                                // value={username}
                                // onChange={(event) => setUsername(event.target.value)}
                                value={username || ''}
                                name="username"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className='mt-3'>
                            {/* <input type='password' 
                            className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                            value={login.password|| ''} 
                            name="password"
                            onChange={handleInputChange}
                            placeholder='Password' /> */}
                            <input
                                type="password"
                                className={validPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Password"
                                value={password || ''}
                                name="password"
                                onChange={handlePasswordChange}
                            // value={password}
                            // onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='mt-5 d-flex justify-content-center'>
                            <Button variant="primary" onClick={confirmLogin} disabled={isLoading}>
                                LOGIN
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;