import React from 'react'
import { Provider } from 'react-redux';
import Router from 'react-router-dom/HashRouter'
import Route from 'react-router-dom/Route'
import store from '../store/store';
import requireAuth from '../components/modules/Auth';
import Layout from '../components/modules/Layout';
import ArticlesList from '../components/pages/ArticlesList';
import LoginPage from '../components/pages/LoginPage';
import { IndexRoute } from 'react-router-dom';


const storage = store()
export default class Application extends React.Component {
    render () {
        return (
            <Provider store={ storage }>
                <Router>
                    <div>
                        <Route path="/" component={requireAuth(Layout)} />
                        <Route path="/personal" component={ ArticlesList } />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </Provider>
        )
    }
}