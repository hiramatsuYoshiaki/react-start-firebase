import React, { useState, useMemo} from 'react'
import { UserContext } from './UserContext' 

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Chat, Gallery, Todo, Shopping, Cart, Serach, Setting, NotFound, Firebase} from './pages/index'
import { Login, Signin, Auth ,Logout, EditUser, ResetPass} from './pages/auth/index'
import { TransitionPages, Fonts} from './pages/develop/index'
import { TopAppBar } from './components/appBar/top/index'
import { BottomAppBar } from './components/appBar/bottom/index'
import { NavigationDrawer } from './components/navigationDrawer/index'
import { Backdrop } from './components/backdrop/index'
// import { Transition,CSSTransition,TransitionGroup, } from "react-transition-group";
import { CSSTransition } from "react-transition-group";

import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "./firebase/config";




const AppRouter = () => {
    console.log('AppRouter');

    const firebaseApp = initializeApp(firebaseConfig); 
    const [user,setUser] = useState(null)
    const valueProvider = useMemo(()=> ({ user, setUser }), [ user, setUser ] ) 
    
    const [isNavigationDrawerOpen, setIsNavigationDrawer] = useState(false)
    const [isBackdropOpen, setIsBackdropOpen] = useState(false)
    const routes = [
        //auth
        // { path: '/edituser', name: 'EditUser', Component: EditUser },

        // { path: '/', name: 'Home', Component: Home },
        { path: '/todo', name: 'Todo', Component: Todo },
        { path: '/gallery', name: 'Gallery', Component: Gallery },
        { path: '/chat', name: 'chat', Component: Chat },
        { path: '/shopping', name: 'Shopping', Component: Shopping },
        //header
        { path: '/cart', name: 'Cart', Component: Cart },
        //footer
        { path: '/serach', name: 'Serach', Component: Serach },
        { path: '/setting', name: 'Setting', Component: Setting },
        // develop 
        { path: '/transitionPages', name: 'TransitionPages', Component: TransitionPages },
        { path: '/fonts', name: 'Fonts', Component: Fonts },
      ]
    
    const duration = 500
    
    return (
        <UserContext.Provider value={valueProvider}>
            <Router>
                <div className="f-app-wraper">
                    <CSSTransition 
                        in={!isNavigationDrawerOpen}
                        timeout={duration}
                        //select transition type: "pushBackLayer" "overlayBackLayer" "fadeBackLayer" "modalBackLayer"
                        classNames="overlayBackLayer"
                    >
                        <div className="f-container">
                            <div className="f-header">
                                <TopAppBar 
                                    isNavigationDrawerOpen={isNavigationDrawerOpen}
                                    setIsNavigationDrawer={setIsNavigationDrawer}
                                    isBackdropOpen={isBackdropOpen}
                                    setIsBackdropOpen={setIsBackdropOpen}
                                />
                            </div>
                            <div className="f-main">  
                                <Switch>
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/logout" component={Logout} />
                                        <Route exact path="/signin" component={Signin} />
                                        <Route exact path="/resetpass" component={ResetPass} />

                                        <Route exact path="/edituser" component={EditUser} />
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/firebase" component={Firebase} />
 
                                        <Auth>
                                            {routes.map(({path,Component})=>(
                                                <Route key={path} path={path} exact component={Component} />
                                            ))}
                                        </Auth>
                                        <Route exact component={NotFound} />
                                </Switch>


                                {/* router transition ------------------------------------- */}
                                {/* {routes.map(({path,Component})=>(
                                    <Route key={path} path={path} exact >
                                        {({ match }) => (
                                            <CSSTransition
                                            in={match != null}
                                            timeout={500}
                                            classNames="push"
                                            unmountOnExit
                                            >
                                            <div className="push">
                                                <Component />
                                            </div>
                                            </CSSTransition>
                                        )}
                                    </Route>
                                ))} */}
                                
                            </div>
                            <div className="f-footer">
                                <BottomAppBar />
                            </div>
                        
                        </div>
                    </CSSTransition>

                    {/* NavigationDrawer --------------------------------- */}
                    <CSSTransition
                        in={isNavigationDrawerOpen}
                        unmountOnExit
                        timeout={duration}
                        classNames="overlayScreen"
                    >
                        <div className="f-screen">
                        </div>
                    </CSSTransition>  
                    <CSSTransition
                        in={isNavigationDrawerOpen}
                        unmountOnExit
                        timeout={duration} 
                        //select transition type: "push" "overlay" "fade" "modal"
                        classNames="overlay"
                    >
                        <div className="f-NavigationDrawer">
                            <NavigationDrawer 
                                isNavigationDrawerOpen={isNavigationDrawerOpen}
                                setIsNavigationDrawer={setIsNavigationDrawer}
                            />
                        </div>
                    
                    </CSSTransition>
                    {/* BackDrop menu ------------------------------------ */}
                    <CSSTransition
                        in={isBackdropOpen}
                        unmountOnExit
                        timeout={duration}
                        classNames="overlayScreen"
                    >
                        <div className="f-screen" onClick={() => setIsBackdropOpen(false)} >
                        </div>
                    </CSSTransition>  
                    <CSSTransition
                        in={isBackdropOpen}
                        unmountOnExit
                        timeout={duration} 
                        //select transition type: "push" "overlay" "overlayR"  "fade" "modal"
                        classNames="overLayB"
                    >
                        <Backdrop isBackdropOpen={isBackdropOpen}
                                setIsBackdropOpen={setIsBackdropOpen}
                                
                        /> 
                    </CSSTransition>
                </div>
                
            </Router>
        </UserContext.Provider>
    )
}

export default AppRouter
