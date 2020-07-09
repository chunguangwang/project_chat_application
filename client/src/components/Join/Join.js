import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
import Animation from '../Canvas/Animation';

const Join = () => {
    const [guess, setGuess] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    var precision = 0.001;
    var prevGuess = 0;
    
    function f(x, M) {
        return x - 0.64 * Math.sin(x) - M;
    }
    
    function derivative(f) {
        return function(x) { return 1 - 0.64 * Math.cos(x); };
    }
    
    function newtonsMethod(guess, M) {
        if (guess === null || guess === undefined)
            guess = 0;
    
        if (Math.abs(prevGuess - guess) > precision) {
            prevGuess = guess;
            var approx = guess - (f(guess, M) / derivative(f)(guess));
    
            console.log(guess);
            // console.log(f(guess));
            // console.log(derivative(f)(guess));
            // console.log(approx);
            console.log('\n');
    
            return newtonsMethod(approx, M);
        } else {
            return guess;
        }
    }

    const shoot = () => alert(newtonsMethod(2, guess));

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <Animation />
                <div><input placeholder="Guess a root" className="joinInput" type="text" onChange={(event) => setGuess(event.target.value)} /></div>

                <button onClick={shoot}>Click Me</button> 
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;