import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';


function FormattedDate(props) {
  return (
  <h2>现在是 {props.date.toLocaleTimeString()}</h2>
  );
}


class Clock extends React.Component {
    state = {
      date: new Date()
    }

    componentDidMount() {
      // this.timeId = setInterval(
      //   () => this.tick(),1000
      // );
      let that = this;
      this.timeId = setInterval(
        function() {
          return that.tick();
        },1000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timeId);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }
    
    render() {
      return (
      <div>
        <h1>Hello, world!</h1>
        {/* <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2> */}
        <FormattedDate date={this.state.date}/>
      </div>
      );
    }
  }

//   function HelloMessage(props) {
//     return (
//         <h1>
//             Hello {props.name}
//         </h1>
//     )
// } 

  class HelloMessage extends React.Component {

    render() {
      return (
        <h1>Hello {this.props.name}</h1>
      );
    }
  }

  class CptBody extends React.Component{

    constructor() {
      super()
      this.state = {
        num: 1
      }
    }
    //click事件函数
    changeAge(){
        this.setState({num:this.state.num+1})
    }
    //change事件函数
    changeUsername(event){
        this.setState({num:parseInt(event.target.value)})
    }

    render(){
       return(
            <div>
                <h1>下面的操作有惊喜</h1>
                <p>父组件：{this.state.num}</p>
                <input type="button" value="点击改变父组件的数字" onClick={()=>this.changeAge()}/>
                {this.state.num === 5 ? <div>结束了</div> :
                <BodyChild changeUsername={(e)=>this.changeUsername(e)} getname={this.state.num}/>}
            </div>
        )
    }
}


class BodyChild extends React.Component{
    constructor() {
      super()
      console.log("钩子函数:constructor");
      this.state = {
        num: 100
      }
    }

    componentDidMount() {
      this.timeId = setInterval(() => {
        console.log("执行定时器")
      },500)
      console.log("钩子函数:componentDidMount")
    }

    componentDidUpdate(prevProp) {
      console.log("上一个prop:"+prevProp.getname);
      console.log("现在的prop:"+this.props.getname);
      console.log("钩子函数:componentDidUpdate");
      if(prevProp.getname !== this.props.getname) {
        this.setState({
          num : this.state.num + 1
        })
      }
      console.log("现在的state:"+this.state.num)
    }

    componentWillUnmount() {
      clearInterval(this.timeId)
      console.log("钩子函数:componentWillUnmount")
    }

    render(){
      console.log("钩子函数:render");
        return(
            <div>
                <p>子组件：<input type='text' value={this.props.getname} onChange={this.props.changeUsername} /></p>
            </div>
        )
    }
}

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggle: true
      };
      // this.handleClick = this.handleClick.bind(this);
    }

    handleClick=() => {
      this.setState({
        isToggle: !this.state.isToggle
      });
    }

    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggle?"on":"off"}
        </button>
      )
    }
}

class Popper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "阻止弹出网页"
      }
      this.preventProp = this.preventProp.bind(this,this.state.name);
    };

    preventProp(name,e) {
      e.preventDefault();
      alert(name);
    }

    render() {
      return (
        <div>
          {/* <a href='https://www.baidu.com' onClick={this.preventProp.bind(this,this.state.name)}>点击地址</a> */}
          {/* <a href='https://www.baidu.com' onClick={(e)=>this.preventProp(this.state.name,e)}>点击地址</a> */}
          <a href='https://www.baidu.com' onClick={this.preventProp}>点击地址</a>

        </div>
      );
    }
}

class Comment extends React.Component {
  
  state = {
    userName: "",
    content: "",
    comments: [
      { id: 1,
        userName: "张三",
        content: "沙发"  
      }
    ]
  }

  changeForm = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]:value
    })
  }

  addComment = () => {
    const { userName, content, comments } = this.state
    if(userName === "" || content === "") {
      alert("请输入评论人和评论内容")
      return
    }
    const newComments = [
      { id: Math.random(),
        userName: userName,
        content: content
      },
      ...comments
    ]
    this.setState({
      comments: newComments,
      userName: "",
      content: ""
    })
    // console.log(this.state.comments)
  }

  renderList() {
    const { comments } = this.state
    if(comments.length === 0) {
      return (<div>暂无评论，快去评论吧</div>)
    }
    return (
      <ul>
      {
        comments.map(item => (
          <li key={item.id}>
            <h3>评论人：{item.userName}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))
      }  
      </ul>
    )
  }

  render() {
    const {userName, content} = this.state
    return (
      <div>
        <input placeholder="请输入评论人" value={userName} name="userName" onChange={this.changeForm}></input> <br/>
        <textarea placeholder="请输入评论内容" value={content} name="content" onChange={this.changeForm}></textarea> <br/>
        <button onClick={this.addComment}>发表评论</button>
        {this.renderList()}
      </div>
    )
  }
}

function ProfilePage(props) {
  const showMessage = () => {
    alert('welcome ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <div>
      <div>函数组件</div>
      <button onClick={handleClick}>welcome</button>
    </div>
    
  );
}

class ProfilePage2 extends React.Component {
  showMessage = () => {
    alert('welcome ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return (
      <div>
        <div>类组件</div>
        <button onClick={this.handleClick}>welcome</button>
      </div>
    );
  }
}

function MessageThread() {
  const [message, setMessage] = useState('');

  const showMessage = () => {
    alert('You said: ' + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

class ParentComponent extends React.Component{
	constructor() {
		super()
		this.state = {
			num: 1
		}
	}
	addNum = () => {
		this.setState({
			num: this.state.num + 1
		})
	}
	changeNum = (e) => {
		this.setState({
			num: e.target.value
		})
	}
	render() {
		return (
      <div>
				<p>父组件的数字：{this.state.num}</p>
				<button onClick={this.addNum}>点击父组件加一</button>
				<ChildComponent num={this.state.num} changeNum={this.changeNum}/>
			</div>
		)
	}
}
class ChildComponent extends React.Component {
	render() {
    return(
      <div>
        <p>子组件的数字：</p>
        <input type='text' value={this.props.num} 
				onChange={this.props.changeNum} />
      </div>
    )
	}
}
  function App() {
    const [user, setUser] = useState("")

    const changeName = (e) => {
      setUser(e.target.value)
    }

    return (
      <div>
        {/* <Clock/>
        <HelloMessage name="李四"/>
        <CptBody />
        <Toggle />
        <Popper />
        <Comment /> */}
        请输入姓名：<input onChange={changeName}></input>
        <br/>
        <ProfilePage user={user}/>
        <br/>
        <ProfilePage2 user={user}/>
        <MessageThread/>
        <ParentComponent />
      </div>
    )
  }

ReactDOM.render(
<App />,
 document.getElementById('root')
);
