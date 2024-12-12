import React, { useState } from 'react';
import Registration from './Registration';
import ResultPage from './ResultPage';
import Login from './Login';
import Voting from './Voting';
import namaste from './namaste.jpg';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [aadhar, setAadhar] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    const handleLogin = (aadhar, has_voted) => {
        setIsLoggedIn(true);
        setAadhar(aadhar);
        setHasVoted(has_voted);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAadhar('');
        setHasVoted(false);
    };

    const toggleRegistration = () => {
        setIsRegistration(!isRegistration);
    };

    return (
        <div>
            {isLoggedIn ? (
                hasVoted ? (
                    <div className='c'><img src={namaste} className='l1'/><br></br><h3>You Have already Voted<br />Thank you for voting!</h3>
                    <ResultPage/></div>
                ) : (
                    <Voting aadhar={aadhar} onLogout={handleLogout} />
                )
            ) : (
                isRegistration ? (
                    <div className='reg2'>
                        <Registration />
                        <p>
                            Already registered?{' '}
                            <a href="#" onClick={toggleRegistration}>Login</a>
                        </p>
                    </div>
                ) : (
                    <div className='b'>
                        <Login onLogin={handleLogin} />
                        <p>
                            Not registered?{' '}
                            <a href="#" onClick={toggleRegistration}>Sign up</a>
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default App;
