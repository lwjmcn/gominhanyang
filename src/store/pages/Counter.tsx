import { useCounterStore } from '../example'

function Counter() {
  const { count, increase, decrease } = useCounterStore()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter Example</h1>
      <p>{count}</p>
      <button onClick={increase} style={{ margin: '5px' }}>+</button>
      <button onClick={decrease} style={{ margin: '5px' }}>-</button>
    </div>
  )
}

export default Counter