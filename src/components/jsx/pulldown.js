import React, {Component} from 'react';
import '../scss/pulldown.scss'
class PullDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            pullEnd: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.handlerTouchStart();
        this.handlerTouchMove();
        this.handlerTouchEnd();
    }

    componentWillUnmount() {
    }

    handlerTouchStart() {
        let contentBox = document.querySelector('.content');
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
                moveY: moveY
            });
            if (moveY > 100) {
                this.setState({
                    pullEnd: true,
                });
                return;
            }
            contentBox.style.transform = `translateY(${moveY}px)`;

            console.log(moveY, '=======moveY')

        })
    }

    handlerTouchEnd(e) {
        let contentBox, pullDownBox, pullDownBoxH,translateDis;
        contentBox = document.querySelector('.content');
        pullDownBox = document.querySelector('.pull-refresh');
        pullDownBoxH = pullDownBox.clientHeight;

        contentBox.addEventListener('touchend', (e) => {
            if(contentBox.style.transform){
                translateDis =Number(/translateY\((-?\d+)px\)/.exec(contentBox.style.transform)[1]);
                if(translateDis >= this.state.moveY){
                    this.setState({
                        isRefreshing:true
                    })
                }
                console.log(translateDis,'===')

            }




        })
    }

    render() {
        return (
            <div className="pull-refresh">
                {
                    this.state.isRefreshing
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

