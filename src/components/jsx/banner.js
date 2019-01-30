import React, {Component} from 'react';
// import './banner.scss'
let BannerList = function (props) {
    return (
        <div className="banner_container">
            <div className="swiper-wrapper">
                {
                    props.items.map((item) => {
                        return (
                            <div className="swiper-slide" key={item.adID}>
                                <a href="javascript:void(0);">
                                    <img src={item.cover||'javascript:void(0)'} alt="0"/>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
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

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="banner">
                <BannerList items={this.state.banners}/>
            </div>
        )
    }

}
export default Banner;

