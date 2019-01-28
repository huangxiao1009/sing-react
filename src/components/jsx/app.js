import React,{Component} from 'react';
import Banner from './banner';
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="app_container">
                <Banner source="https://music.51vv.com/api/activity/info/querySpaceUser.htm?userID=7848965" />
            </div>
        )
    }
}
export default App;

