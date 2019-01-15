/**
 * Created by huangxiao on 2019/1/14.
 */
import _ from 'lodash'
import printMe from './b.js'
import {square} from '../components/js/math'
// import '../src/index.css'
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['hello', 'webpack'], ' 000');
    element.innerHTML = 'click me!';
    element.classList.add('hello');
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}
document.body.appendChild(component());
console.log(square(2),'=========');
