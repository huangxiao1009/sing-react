import React, {Component} from 'react';
import '../scss/pulldown.scss'
class PullDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullEnd: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            pullDownHei:0,//下拉部分框的真实高度
            // canRefresh:false,//可以刷新了
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.handlerTouchStart();
        this.handlerTouchMove();
        this.handlerTouchEnd();
        this.setState({
            pullDownHei:this.refs.pulldownbox.clientHeight,
        });
    }

    componentWillUnmount() {
    }

    handlerTouchStart() {
        let contentBox = document.querySelector('.content');

        let pullDownBoxHei = document.querySelector('.pull-refresh').clientHeight;

        contentBox.addEventListener('touchstart', (e) => {
            let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollT) return;
            let startX = e.changedTouches[0].clientX;
            let startY = e.changedTouches[0].clientY;
            this.setState({
                startX: startX,
                startY: startY,
            });

        })
    }

    handlerTouchMove() {
        let contentBox = document.querySelector('.content');

        contentBox.addEventListener('touchmove', (e) => {
            let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollT) return;
            let startX = e.changedTouches[0].clientX;
            let startY = e.changedTouches[0].clientY;
            let moveX = startX - this.state.startX;
            let moveY = startY - this.state.startY;
            if (moveX > 50) return;//横向滑动
            this.setState({
                moveX: moveX,
                moveY: moveY,
            });
            this.props.changeRefreshState(false);
            if (moveY > 250) {//最多下拉100距离
                this.setState({
                    pullEnd: true,
                });

                return;
            }else{
                this.setState({
                    pullEnd: false,
                });
            }
            contentBox.style.transform = `translateY(${moveY}px)`;
            // console.log(moveY, '=======moveY')
        })
    }

    handlerTouchEnd(e) {
        let contentBox, pullDownBox,translateDis;
        contentBox = document.querySelector('.content');
        pullDownBox = document.querySelector('.pull-refresh');

        contentBox.addEventListener('touchend', (e) => {
            //点击榜单按钮不触发touchend回调
            if(e.target.nodeName ==='LI'&&e.target.parentNode.className.indexOf('tabs-nav')>-1) return;
            if(contentBox.style.transform){
                translateDis =Number(/translateY\((-?\d+)px\)/.exec(contentBox.style.transform)[1]);
                if(!translateDis) return;
                if(this.state.pullDownHei <= this.state.moveY){
                    this.props.changeRefreshState(true);
                    contentBox.style.transform=`translateY(${this.state.pullDownHei}px)`;
                }

            }
        })
    }

    render() {
        return (
            <div className={ this.state.pullEnd ? 'pull-refresh' :'pull-refresh' } ref="pulldownbox">
                {
                    this.props.contentRefreshing
                        ?
                        <div className="isloading">正在刷新...</div>
                        :
                        <div className="pulling">
                            { !this.state.pullEnd && <span className="arrow-down"></span>}
                            { this.state.pullEnd && <span className="arrow-up">释放刷新</span> }
                        </div>

                }
            </div>
        )
    }
}
export default PullDown;

