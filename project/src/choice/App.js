import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends PureComponent {
    constructor() {
        super()
        this.state = {
            item: {
                title: "Kindle",
                children: [{
                    title: "是否经常阅读",
                    id: 1,
                    children: [{
                        title: "是",
                        target: 2
                    }, {
                        title: "否",
                        target: 101,
                    }]
                },{
                    title:"常阅读什么书",
                    id:2,
                    children:[{
                        title:"工具书,教材",
                        target:101
                    },{
                        title:"小说,文学",
                        target:3
                    }]
                }],
                choices: [{
                        title: "平板电脑",
                        id: 101
                    },
                    {
                        title: "入门版",
                        id: 102
                    }, {
                        title: "Paperwhite",
                        id: 103
                    }, {
                        title: "Voyage",
                        id: 104
                    }, {
                        title: "Oasis 2",
                        id: 105
                    }
                ]
            }
        }
    }
    render(){
        return (
            <div>
                <Router>
                    <Link to="/topic"> 创建问卷 </Link>
                </Router>
            </div>
        )
    }
}

export default App