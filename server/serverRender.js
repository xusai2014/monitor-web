import { renderToString } from 'react-dom/server'
import store from '../client/store/store';
import  rootReducer from '../client/reducers';

import { Provider } from "react-redux";
import React from 'react';
import {
    Router,
    Route,

    StaticRouter
} from 'react-router-dom';
import ArticlesListContianer from '../client/components/pages/ArticlesList'
import createBrowserHistory from 'history/createBrowserHistory'

const storage = store()(rootReducer);

export function handleRender(req, res) {
    // Render the component to a string
    const context = {}
    const html = renderToString((<Provider store={ storage } >
        <StaticRouter location={req.url} context={context}>
        <Route path="/"><Route path="/" component={ArticlesListContianer} />
        </Route>
        </StaticRouter>
        </Provider>)

)

    const preloadedState = storage.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
    return `
    <html>
        <head>
            <script src="/node_modules/jquery/dist/jquery.js"></script>
            <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        </head>
        <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        
        <script src="/bin/client.bundle.js"></script>
        
        </body>
        </html>
    `
}