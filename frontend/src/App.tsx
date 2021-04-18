import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { Layout } from './components'
import LobbyContextProvider from './contexts/Lobby'

const Home = React.lazy(() => import('./pages/Home'))
const Lobby = React.lazy(() => import('./pages/Lobby'))
const Lobbies = React.lazy(() => import('./pages/Lobbies'))
const Play = React.lazy(() => import('./pages/Play'))

const App = () => {
    return (
        <Layout>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/create'>
                        <Lobby />
                    </Route>
                    <Route exact path='/lobbies'>
                        <Lobbies />
                    </Route>
                    <Route path='/play'>
                        <LobbyContextProvider>
                            <Play />
                        </LobbyContextProvider>
                    </Route>
                    <Route path='/'>
                        <div>404</div>
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    )
}

export default App
