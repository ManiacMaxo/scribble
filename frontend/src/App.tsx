import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))
const Lobby = React.lazy(() => import('./pages/Lobby'))

const App = () => {
    return (
        <Suspense fallback='loading...'>
            <main className='main'>
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
            </main>
        </Suspense>
    )
}

export default App
