import React, { Component } from 'react';
import {
    HashRouter,
    Route
} from 'react-router-dom';

const Home = (props)=>{
    return (
        <div>
            <aside></aside>
            <main>
                {props.children}
            </main>
        </div>
    )
}

const Greeter = ()=> (<h3>hello, this is sharmin!</h3>)

const RouterContainer = (props)=>{
    return (<Home children={props.children} />)
}

const Router = ()=>{
    return (
        <HashRouter>
            <Route path='/' component={Greeter} />   
        </HashRouter>
    )
} 

export default Router;
