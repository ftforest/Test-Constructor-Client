import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App2 from "./App2";
import ErrorPage from "./Components/bootstrap/ErrorPage";
import ListTestsPage from "./Components/bootstrap/ListTestsPage";
import CreateTest from "./Components/bootstrap/PagesMyTest/CreateTest";
import ListTestsComplitePage from "./Components/bootstrap/ListTestsComplitePage";
import MyTestsPage from "./Pages/MyTestsPage/MyTestsPage";
import ComplitedTestsPage from "./Pages/ComplitedTestsPage/ComplitedTestsPage";
import EditTestsPage from "./Pages/MyTestsPage/EditTestsPage/EditTestsPage";
import TestProvider from "./hooks/test-hook";
import QuestionProvider from "./hooks/question-hook";
import EditQuestionPage from "./Pages/MyTestsPage/EditTestsPage/EditQuestionPage/EditQuestionPage";
import AnswerProvider from "./hooks/answer-hook";
import CreateElementPage from "./Pages/MyTestsPage/CreateElementPage/CreateElementPage";

const Routery = () => {
    const storeType = ['state','storeg','redux']
    const globalStore = storeType[1]
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App2/>} errorElement={<ErrorPage/>}/>
                    <Route path='my-tests' element={<ListTestsPage/>} errorElement={<ErrorPage/>}/>
                    <Route path='complited-tests' element={<ListTestsComplitePage/>} errorElement={<ErrorPage/>}/>
                    <Route path='create-test/:id' element={<CreateTest/>} errorElement={<ErrorPage/>}/>

                    <Route path='tests' element={<WrapProviders globalStore={globalStore}><MyTestsPage/></WrapProviders>} errorElement={<ErrorPage/>}/>
                    <Route path='complited-tests-page' element={<ComplitedTestsPage/>} errorElement={<ErrorPage/>}/>

                    <Route path='tests/create/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='tests/edit/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='tests/delete/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>

                    <Route path='test/view/:id' element={<WrapProviders globalStore={globalStore}><EditTestsPage/></WrapProviders>} errorElement={<ErrorPage/>}/>
                    <Route path='question/view/:id' element={<WrapProviders globalStore={globalStore}><EditQuestionPage/></WrapProviders>} errorElement={<ErrorPage/>}/>
                    <Route path='create/:name/:additionalId' element={<WrapProviders globalStore={globalStore}><CreateElementPage/></WrapProviders>} errorElement={<ErrorPage/>}/>
                    <Route path='edit/:name/:additionalId/:id' element={<WrapProviders globalStore={globalStore}><CreateElementPage/></WrapProviders>} errorElement={<ErrorPage/>}/>

                    <Route
                        path="*"
                        element={<Navigate to="tests" replace />}
                    />
                </Routes>
        </BrowserRouter>
    );
};

const EidtQuestionsPageProviders = () => {
    return (
        <QuestionProvider>
            <TestProvider>
                <EditTestsPage/>
            </TestProvider>
        </QuestionProvider>
    )
}

const WrapProviders = ({children,globalStore}) => {
    return (
        <TestProvider globalStore={globalStore}>
            <QuestionProvider globalStore={globalStore}>
                <AnswerProvider globalStore={globalStore}>
                    {children}
                </AnswerProvider>
            </QuestionProvider>
        </TestProvider>
    )
}

export default Routery;