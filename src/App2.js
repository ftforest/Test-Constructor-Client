import React, { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from "./components/bootstrap/AuthPage";
import {useStates} from "./components/bootstrap/StateProvider";
import {scream,scream2} from "./JavaScriptVanilla/2023_07_07_001_fn_is_var__fn_scream";

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