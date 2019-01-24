/**
 * Created by huangxiao on 2019/1/22.
 */
import React, {Component} from 'react';

import {render} from 'react-dom';

render(
    <div>
        hello,{22 + 12}
        {/*这是注释*/}
    </div>,
    document.getElementById('app')
);