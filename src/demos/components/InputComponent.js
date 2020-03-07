/* @flow */
import React, {
    useState, memo, useCallback, useMemo
} from 'react';
function Child(props) {
    const {number} = props.data
    function changeChild() {
        console.log('Child')
    }
    const otherName =  useMemo(() => changeChild(), [number])
    
    return (
        <div>
            <button onClick={props.addClick}>{number}</button>
        </div>
    )
}
function Button({ name, children }) {
    function changeName(name) {
      console.log('11')
      return name + '改变name的方法'
    }
  
    const otherName =  useMemo(() => changeName(name), [name])
    return (
        <>
          <div>{otherName}</div>
          <div>{children}</div>
        </>
  
    )
  }
Child = memo(Child)
let lastChangeName;
let lastData;
const InputComponent = () => {
    let [number, setNumber] = useState(0);
    let [name, setName] = useState('leiJun')
    const [name2, setName2] = useState('名称')
    const [content,setContent] = useState('内容')
    const addClick = useCallback(() => setNumber(number + 1), [number])

    lastChangeName = addClick
    // const data = useMemo(() => ({number}), []);
    const data = {number}
    return (
        <>
        首先我们可以看到 , Botton和Child两个子组件 , 在父组件调用其他函数的时候 , Botton里面的changeName和Child里面的changeChild都是不会改变的 , 但是只要改变Botton或者Child有改变 , 就会修改对应的函数
<br/>
这就是useMome方法的作用 , 避免父组件调用其他子组件或者自身方法组件重新渲染 , 而导致其他子组件api的执行 , 简单来说就是避免无用方法的使用
            <input type='text' value={name} onChange={e=>setName(e.target.value)} />
            <button onClick={() => setName(new Date().getTime())}>changeName</button>
            <Child addClick={addClick} data={data} />

            <hr />
            <button onClick={() => setName2(new Date().getTime())}>name2</button>
            <button onClick={() => setContent(new Date().getTime())}>content</button>
            <Button name={name2}>{content}</Button>
            <br/>
            所以我们可以使用useMemo方法，避免无用方法的调用，当然一般我们changName里面可能会使用useState来改变state的值，那是不是就避免了组件的二次渲染，达到了优化性能的目的。
        </>
    )
}
export default InputComponent