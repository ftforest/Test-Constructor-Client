import React from 'react';

function Registration(props) {

    function onClick () {

    }

    return (
        <div className="registration">
            <div>
                <h2>Регистрация</h2>
                <input type="text"/>
                <br/>
                <br/>
                <input type="text"/>
                <br/>
                <br/>
                <div className="actions">
                    <a href="/#" onClick={onClick}>Забыли пароль?</a>
                    <button>Войти</button>
                </div>
            </div>
        </div>
    );
}

export default Registration;