import classes from './App.module.scss';
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NewsView from "./components/NewsView/NewsView.jsx";

import {Routes, Route, Navigate} from 'react-router-dom';
import AuthView from "./views/AuthView/AuthView.jsx";
import NotFoundView from "./views/NotFoundView/NotFoundView.jsx";
import UsersView from "./views/UsersView/UsersView.jsx";
import HomeView from "./views/HomeView/HomeView.jsx";

function App() {
    return (
        <div className={classes["App"]}>
            { /* HEADER */}
            <Header/>
            <main>
                <Routes>
                    <Route path='admin' element={<HomeView/>}/>
                    <Route path='users' element={<UsersView/>}/>
                    <Route path='news' element={<NewsView/>}/>
                    <Route path='auth/*' element={<AuthView/>}/>
                    <Route path='*' element={<NotFoundView/>}/>
                    <Route index element={<AuthView/>}/>
                </Routes>
            </main>
            { /* FOOTER */}
            <Footer/>
        </div>
    )
}

export default App
