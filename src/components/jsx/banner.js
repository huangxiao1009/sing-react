import React,{Component} from 'react';
class Banner extends Component{
    constructor(props){
        super(props);
        this.state = {
            banners:null,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    componentDidMount(){
        fetch(this.props.source)
            .then(res => res.json())
            .then(res => function () {
                console.log(`banners:${res}`)
            })
            .catch(err=> {
                console.log(err);
            })
    }
    componentWillUnmount(){

    }
    render(){
        return(
            <div className="banner">
                banners
            </div>
        )
    }

}
export default Banner;

