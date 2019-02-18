import React, {Component} from 'react';
import '../scss/nav.scss'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    fetchBannerList(){
        fetch(this.props.source)
            .then(res => res.json())
            .then(res => {
                console.log(`banners:`, res);
                this.setState({
                    banners: res.spaceAdHomepage || []
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="nav flex flex-w flex-pack-center">
                <span className="part1 singer">歌手</span>
                <span className="part1 classify">分类</span>
                <span className="part1 checked">已点</span>
                <span className="part2 sing-room">歌房</span>
                <span className="part2 live">直播</span>
                <span className="part2 sing-together">合唱</span>
                <span className="part2 sing-clear">清唱</span>
            </div>
        )
    }

}
export default Nav;

