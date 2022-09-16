# React的使用

## 一、安装和配置

---

## 二、基本使用

### 元素渲染

​元素是构成React应用的最小单位，通过`ReactDom.render()`方法进行渲染

```
// 元素可以是一段html代码
const element = <h1>Hello, world!</h1>
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

### React `JSX`

​`JSX`类似`HTML`和`JS`的结合

```
// 可以使用js表达式,需要写在花括号{}中
const name = "张三"
const element = <h1>Hello, {name}!</h1>
```

### React 组件

#### React组件包括函数组件和`ES6`的class组件

​注：组件要有return，返回有效的element，或者不渲染就返回null

​       	组件首字母要大写，区分一般函数

```
// 函数组件
function HelloMessage() {
	return <h1>Hello World!</h1>
}
// class组件
class Welcome extends React.Component {
	render() {
		return <h1>Hello World!</h1>
	}
}
// const element = <HelloMessage />
const element = <Welcome />
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

#### 函数组件和class组件的比较

1. 相同点：

​	都return一个元素

2. 不同点：

​	class组件有this，指向当前class实例，调用函数和props要加this.；函数组件不需要

```
// 函数组件
function HelloMessage(props) {
	return <h1>Hello,{props.name}</h1>
}
// class组件
class Welcome extends React.Component {
	render() {
		return <h1>Hello,{this.props.name}</h1>
	}
}
// const element = <HelloMessage name="张三"/>
const element = <Welcome name="张三"/>
ReactDOM.render(
    element,
    document.getElementById('example')
);
```

​函数组件可以使用hooks，class组件不行，但有一些生命周期函数(实现好的hooks)

#### class组件的特性

 1. 生命周期函数

    React 15和16的周期函数略有不同，下面是16的生命周期：

    ![](..\md图片\react16生命周期.jpg)

​		常用生命周期函数

​		`constructor`：构造函数，挂载前调用

​		`render`：唯一必须实现的方法，渲染内容

​		`getDerivedStateFromProps`：static方法，在render方法前调用，在初始挂载和后续更新都会被调用，可以在props发生变化时更新state

​		`shouldComponentUpdate`：在props或state发生变化时，如果返回true，才会渲染

​		`componentDidMount`：在挂载后调用

​		`componentDidUpdate`：在更新后调用

​		`componentWillUnmount`：在卸载前调用（清除定时器）

​		重点是加入了`getDerivedStateFromProps`，废弃了render阶段的一些生命周期：

​		`componentWillMount，componentWillUpdate，componentWillReceiveProps`

​		详情见React 16的Fiber架构 [文章](https://zhuanlan.zhihu.com/p/416859389)

2. this指向

   this一般指向当前类实例，但是在函数内部this指向会发生改变，可以通过bind()或箭头函数解决

   ```
   // 使用bind()
   class Welcome extends React.Component {
   	constructor() {
   		super()
   		this.state = {
   			name : "张三"
   		}
   		// 推荐在构造函数绑定，只会在初始挂载前调用一次
   		this.changeName = this.changeName.bind(this)
   	}
   	changeName() {
   		this.state({
   			name : "李四"
   		})
   	}
   	render() {
   		return (
   		<div>
   			<h1>Hello,{this.state.name}</h1>
   			<button onClick={this.changeName}></button>
   		</div>
   		)
   	}
   }
   
   // 使用箭头函数
   class Welcome extends React.Component {
   	constructor() {
   		super()
   		this.state = {
   			name : "张三"
   		}
   	}
   	changeName = () => {
   		this.setState({
   			name : "李四"
   		})
   	}
   	render() {
   		return (
   		<div>
   			<h1>Hello,{this.state.name}</h1>
   			<button onClick={this.changeName}>点击按钮</button>
   		</div>
   		)
   	}
   }
   ```

3. props传递

   props从父组件=>子组件，父组件传props，子组件直接通过this.props获取

   props从子组件=>父组件，父组件传一个事件函数，子组件发生事件时调用该函数

   ```
   class ParentComponent extends React.Component {
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
   				<ChildComponent num={this.state.num} 
   				changeNum={this.changeNum}/>
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
   ```