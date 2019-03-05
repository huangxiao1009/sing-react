import React, {Component} from 'react';
import Banner from './banner';
import Nav from './nav';
import Songs from './songs';
import PullDown from './pulldown';
import '../scss/app.scss'
class App extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            contentRefreshing:false,//列表部分正在刷新
            refreshFinished:false,//列表刷新完成

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    changeRefreshState(refState){
        this.setState({
            contentRefreshing:refState,
        })
    }
    changeRefFinished(isFinished){
        this.setState({
            refreshFinished:isFinished
        })
    }
    render() {
        return (
            <div className="app_container">
                <PullDown changeRefreshState ={(state) =>{this.changeRefreshState(state)}} contentRefreshing={this.state.contentRefreshing} />
                <div className={this.state.contentRefreshing ?'content refreshing':'content'}>
                    <Banner source="/data/classification.htm"/>
                    <Nav/>
                    <Songs changeRefreshState ={(state) =>{this.changeRefreshState(state)}} contentRefreshing={this.state.contentRefreshing}/>
                </div>
            </div>
        )
    }
}
export default App;

