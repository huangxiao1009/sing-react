import React,{Component} from 'react';
import Banner from './banner';
import Nav from './nav';
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="app_container">
                <Banner source="/data/classification.htm" />
                <Nav/>
            </div>
        )
    }
}
export default App;

