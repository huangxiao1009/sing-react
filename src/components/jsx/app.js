import React,{Component} from 'react';
import Banner from './banner';
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="app_container">
                <Banner/>
            </div>
        )
    }
}
export default App;

