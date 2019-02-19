import React, {Component} from 'react';
import Banner from './banner';
import Nav from './nav';
import Songs from './songs';
import PullDown from './pulldown';
class App extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

    }

    componentDidMount() {
        this.initRefresh();
    }

    componentWillUnmount() {

    }

    //下拉刷新
    initRefresh() {
        window.addEventListener('scroll', this.handleRefreshScroll.bind(this))
    }

    handleRefreshScroll() {
        console.log('rrr')
    }

    render() {
        return (
            <div className="app_container">
                <PullDown/>
                <div className="content">
                    <Banner source="/data/classification.htm"/>
                    <Nav/>
                    <Songs/>
                </div>

            </div>
        )
    }
}
export default App;

