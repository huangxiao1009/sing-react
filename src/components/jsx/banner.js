import React, {Component} from 'react';
import '../scss/banner.scss'

let BannerList = function (props) {
    let initSwiper = function (ref){
        if(!ref) return;
        //swiper-wrapper已被挂载到dom中
        if(props.items && props.items.length){
            console.log(document.querySelector('.banner_container'),'======');
            window.swiperBanner = new Swiper('.banner_container',{
                direction:'horizontal',
                autoplay:3000,
                autoplayDisableOnInteraction:false
            })
        }

    };
    return (
        <div className="banner_container">
            <div className="swiper-wrapper" ref={self => initSwiper(self)} >
                {
                    props.items.map((item) => {
                        let backgroundStyle = {
                            backgroundImage:`url(${item.cover})`,
                            backgroundPosition:'center center',
                            backgroundSize:'cover',
                        };
                        return (
                            <div className="swiper-slide" key={item.adID}>
                                <a href="javascript:void(0);" style={backgroundStyle}></a>
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
        this.fetchBannerList();
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
            <div className="banner">
                <BannerList items={this.state.banners} />
            </div>
        )
    }

}
export default Banner;

