import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load'
import '../scss/songs.scss'

//tabs
let Tabs = function (props) {
    return (
        <div className="songs-tabs">
            <ul className="flex flex-pack-justify" onClick={e => props.handleClick(e)}>
                <li className={props.listType === 1 ? 'active' : ''} data-type="1">猜你喜欢</li>
                <li className={props.listType === 2 ? 'active' : ''} data-type="2">热歌榜</li>
                <li className={props.listType === 3 ? 'active' : ''} data-type="3">点唱榜</li>
                <li className={props.listType === 4 ? 'active' : ''} data-type="4">年龄榜</li>
                <li className={props.listType === 5 ? 'active' : ''} data-type="5">新歌榜</li>
                <li className={props.listType === 6 ? 'active' : ''} data-type="6">原创榜</li>
            </ul>
        </div>
    )
};


//列表
let List = function (props) {
    return (
        <div className="songs-list">
            <ul className="items">
                {
                    props.items.map((item, index) => {
                        return (
                            <li key={item.songID || index}>
                                <LazyLoad  width={50} height={50}>
                                    <img src={item.CDNPiclink1|| require("../../images/default_head@3x.png")}  alt=""/>
                                </LazyLoad>
                                <div className="song-info flex flex-v flex-pack-center">
                                    <span className="song-name">{item.name || ''}</span>
                                    <span className="singer">
                                        <em className="size">{(item.fileSize / 1024 / 1024).toFixed(2) + 'M'}</em>
                                        -{item.singerName || ''}
                                        </span>
                                </div>
                                <span className="play-btn">播放</span>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
};
class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsData: [],//一把拉取的数据
            list: [],//要渲染的数据
            listType: 1,
            curPage: 1,
            viewNumber: 30,
            dataURL: {
                1: '/data/songs_hot.htm',
                2: '/data/songs_love.htm',
                3: '/data/songs_new.htm',
                4: '/data/songs_age.htm',
                5: '/data/songs_hot.htm',
                6: '/data/songs_new.htm',
            },
            firstPageEmpty: false,
            allLoaded: false,
            loading: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.fetchSongs(1);
    }

    componentWillUnmount() {

    }

    fetchSongs(listType) {
        let dataURL = this.state.dataURL[listType];
        this.setState({
            curPage: 1
        });
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

    getCurPageData() {
        this.unBindScrollHandler();
        this.setState({
            loading: true,
        });
        let start = (this.state.curPage - 1) * this.state.viewNumber;
        let end = start + this.state.viewNumber;
        let data = this.state.songsData.slice(start, end);
        console.log('当前页：', start, end, data);
        if (this.state.curPage === 1 && !data.length) {
            //首页无数据
            this.setState({
                allLoaded: false,
                firstPageEmpty: true
            })
        } else if (this.state.curPage === 1 && data.length && data.length < this.state.viewNumber) {
            this.setState({
                allLoaded: true,
                firstPageEmpty: false
            })
        } else if (this.state.curPage !== 1 && data.length < this.state.viewNumber) {
            this.setState({
                allLoaded: true,
                firstPageEmpty: false
            })
        }
        if (this.state.curPage === 1) {
            this.setState({
                list: data,
            })
        } else {
            this.setState({
                list: this.state.list.concat(data),
            })
        }
        this.setState({
            loading: false,
            curPage: this.state.curPage + 1
        });
        if (data.length === this.state.viewNumber) {
            this.bindScrollHandler();
        }
    }

    handleTabsClick(e) {
        let listType = Number(e.target.dataset.type);
        if (!listType || listType == this.state.listType) return;
        this.setState({
            listType: listType,
            firstPageEmpty: false,
            allLoaded: false,
            loading: false,
        });
        this.fetchSongs(listType);
    }

    bindScrollHandler() {
        //上拉加载
        window.onscroll = e => {
            let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            let screenH = document.documentElement.clientHeight || document.body.clientHeight;
            let bodyH = document.getElementsByTagName('body')[0].scrollHeight;
            if (scrollT + screenH >= bodyH) {
                this.getCurPageData();
            }
        }
    }

    unBindScrollHandler() {
        window.onscroll = null;
    }
    render() {
        return (
            <div className="songs-container">
                <Tabs listType={this.state.listType} handleClick={this.handleTabsClick.bind(this)}/>
                <List items={this.state.list}/>
                {
                    this.state.loading && <div className="loading">加载中...</div>
                }
                {
                    this.state.allLoaded && <div className="allloaded">已加载全部</div>
                }
                {
                    this.state.firstPageEmpty && <div className="first-empty">暂无歌曲~</div>
                }
            </div>
        )
    }

}
export default Songs;

