import React,{Component} from 'react';
import Banner from './banner';
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="app_container">
                111
                <Banner source="/data/classification.htm" />
            </div>
        )
    }
}
export default App;

