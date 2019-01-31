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
            <div className="nav flex flex-w flex-pack-justify">
                <span className="part1">歌手</span>
                <span className="part1">分类</span>
                <span className="part1">已点</span>
                <span className="part2">歌房</span>
                <span className="part2">直播</span>
                <span className="part2">合唱</span>
                <span className="part2">清唱</span>
            </div>
        )
    }

}
export default Nav;

