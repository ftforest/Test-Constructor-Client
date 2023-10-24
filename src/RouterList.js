import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App2 from "./App2";
import ErrorPage from "./components/bootstrap/ErrorPage";
import ListTestsPage from "./components/bootstrap/Pages/ListTestsPage/ListTestsPage";
import CreateTest from "./components/bootstrap/Pages/ListTestsPage/CreateTest/CreateTest";
import ListTestsComplitePage from "./components/bootstrap/Pages/ListTestsComplitePage/ListTestsComplitePage";

const Routery = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App2/>} errorElement={<ErrorPage/>}/>
                    <Route path='my-tests' element={<ListTestsPage/>} errorElement={<ErrorPage/>}/>
                    <Route path='complited-tests' element={<ListTestsComplitePage/>} errorElement={<ErrorPage/>}/>
                    <Route path='create-test/:id' element={<CreateTest/>} errorElement={<ErrorPage/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default Routery;