import React, { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from "./Components/bootstrap/AuthPage";
import {useStates} from "./Components/bootstrap/StateProvider";

function App2(props) {
    const {states} = useStates();
    //
    /*scream('function can be returned from other functions')
    scream('createScream returns a function')
    scream('scream invokes that returned function')
    scream2('scream2 invokes that returned function')*/

    return (
        <>
            <AuthPage login={states.login} />
        </>
    );
}

export default App2;