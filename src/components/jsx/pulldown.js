import React, {Component} from 'react';
import '../scss/pulldown.scss'
class PullDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPulling:false,
            isLoading:false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {}
    render() {
        return (
            <div className="pull-refresh">
                <div className="pulling">
                    { this.state.isPulling && <span className="arrow"></span>}
                    { this.state.isLoading && <span>下拉加载更多</span>}
                </div>
                <div className="isloading"></div>
            </div>
        )
    }
}
export default PullDown;

