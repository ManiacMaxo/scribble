import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Lobby from './Lobby'

const Home = React.lazy(() => import('./Home'))

const App = () => {
    return (
        <Suspense fallback='loading...'>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/play'>
                    <Lobby />
                </Route>
                <Route path='/'>
                    <div>404</div>
                </Route>
            </Switch>
        </Suspense>
    )
}

export default App
