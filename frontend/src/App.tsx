import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import LobbyContextProvider from './contexts/Lobby'

const Home = React.lazy(() => import('./pages/Home'))
const Lobby = React.lazy(() => import('./pages/Lobby'))

const App: React.FC = () => {
    return (
        <Suspense fallback='loading...'>
            <main className='main'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/play'>
                        <LobbyContextProvider>
                            <Lobby />
                        </LobbyContextProvider>
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
