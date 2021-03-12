import React, {Component} from 'react';
import Cardlist from '../Components/Cardlist'
//import {robots} from '../Components/robots'
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';

//props are things that comes out of the state


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response =>  response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    render() {
        const {robots, searchfield} = this.state
        const filteredRobots = robots.filter(robot =>
             robot.name.toLowerCase().includes(searchfield.toLowerCase())
        )
        
        return !robots.length ?
            <h1> loading </h1> :
            (
                <div className='tc'>   
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary> 
                            <Cardlist robots = {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default App;