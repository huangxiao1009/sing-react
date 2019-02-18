import React, {Component} from 'react';
import '../scss/songs.scss'

//tabs
let Tabs = function (props) {
    return(
        <div className="song-tabs">
            <ul className="flex flex-pack-justify" onClick={e =>props.handleClick(e)}>
                <li className={props.listType===1 ? 'active' : ''} data-type="1">猜你喜欢</li>
                <li className={props.listType===2 ? 'active' : ''} data-type="2">热歌榜</li>
                <li className={props.listType===3 ? 'active' : ''} data-type="3">点唱榜</li>
                <li className={props.listType===4 ? 'active' : ''} data-type="4">年龄榜</li>
                <li className={props.listType===5 ? 'active' : ''} data-type="5">新歌榜</li>
                <li className={props.listType===6 ? 'active' : ''} data-type="6">原创榜</li>
            </ul>
        </div>
    )
};


//列表
let List = function (props) {
    return (
        <div className="songs-list">
            <ul className="items" >
                {
                    props.items && props.items.length ?
                    props.items.map((item) => {
                        return (
                            <li key={item.artistID}>
                                <a href="javascript:void(0);"></a>
                            </li>
                        )
                    })
                    :
                    ''
                }
            </ul>
        </div>
    )
};


class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsData:[],//一把拉取的数据
            list: [],//要渲染的数据
            listType:1,
            curPage:1,
            viewNumber:30,
            dataURL:{
                1:'/data/songs_hot.htm',
                2:'/data/songs_love.htm',
                3:'/data/songs_new.htm',
                4:'/data/songs_love.htm',
                5:'/data/songs_hot.htm',
                6:'/data/songs_new.htm',
            },
            firstPageEmpty:false,
            allLoaded:false,
            loading:false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.fetchSongs(1);
    }

    componentWillUnmount() {

    }
    fetchSongs(listType){
        let dataURL = this.state.dataURL[listType];
        fetch(dataURL)
            .then(res => res.json())
            .then(res => {
                console.log(`songs:`, res);
                this.setState({
                    songsData: res.songs || [],
                });
                this.getCurPageData();//加载首页
            })
            .catch(err => {
                console.log(err);
            })
    }
    getCurPageData(){
        this.setState({
           loading:true,
        });
        let start =  (this.state.curPage-1) * this.state.viewNumber;
        let end = start + this.state.viewNumber;
        let data = this.state.songsData.slice(start,end);
        if(this.state.curPage === 1 && !data.length){
            //首页无数据
            this.setState({
                firstPageEmpty:true
            })
        }
        if(data.length < this.state.viewNumber){
            this.setState({
                allLoaded:true
            })
        }
        this.setState({
            list:data,
            loading:false,
            curPage:this.state.curPage++
        })
    }
    handleTabsClick(e){
        let listType = Number(e.target.dataset.type);
        if(!listType) return;
        this.setState({
            listType:listType
        });
        this.fetchSongs(listType);
    }
    render() {
        return (
            <div className="songs-container">
                <Tabs listType={this.state.listType} handleClick={this.handleTabsClick.bind(this)} />
                <List items={this.state.list}/>
            </div>
        )
    }

}
export default Songs;

