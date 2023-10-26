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

const Routery = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App2/>} errorElement={<ErrorPage/>}/>
                    <Route path='my-tests' element={<ListTestsPage/>} errorElement={<ErrorPage/>}/>
                    <Route path='complited-tests' element={<ListTestsComplitePage/>} errorElement={<ErrorPage/>}/>
                    <Route path='create-test/:id' element={<CreateTest/>} errorElement={<ErrorPage/>}/>

                    <Route path='my-tests-page' element={<TestProvider><MyTestsPage/></TestProvider>} errorElement={<ErrorPage/>}/>
                    <Route path='complited-tests-page' element={<ComplitedTestsPage/>} errorElement={<ErrorPage/>}/>

                    <Route path='my-tests-page/create/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='my-tests-page/edit/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='my-tests-page/delete/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='test/view/:id' element={<EidtQuestionsPageProviders/>} errorElement={<ErrorPage/>}/>

                    <Route path='question/view/:id' element={<EditQuestionPageProviders/>} errorElement={<ErrorPage/>}/>
                    <Route path='create/:name-element' element={<EditQuestionPageProviders/>} errorElement={<ErrorPage/>}/>

                    <Route
                        path="*"
                        element={<Navigate to="my-tests-page" replace />}
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

const EditQuestionPageProviders = () => {
    return (
        <AnswerProvider>
            <QuestionProvider>
                <EditQuestionPage/>
            </QuestionProvider>
        </AnswerProvider>
    )
}

export default Routery;