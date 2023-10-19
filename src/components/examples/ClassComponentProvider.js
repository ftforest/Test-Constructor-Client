import React from 'react';

const MyContext = React.createContext();

function MyContextProvider(props) {
    const value = 'Hello, World!';

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    );
}

function withMyContext(Component) {
    return function WithMyContext(props) {
        return (
            <MyContext.Consumer>
                {value => <Component {...props} contextValue={value} />}
            </MyContext.Consumer>
        );
    };
}

class MyClassComponent extends React.Component {
    render() {
        const { contextValue } = this.props;
        return <p>{contextValue}</p>;
    }
}

const MyClassComponentWithContext = withMyContext(MyClassComponent);

class App extends React.Component {
    render() {
        return (
            <MyContextProvider>
                <MyClassComponentWithContext />
            </MyContextProvider>
        );
    }
}

export default App;