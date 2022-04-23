import { createEffect, createMemo, createResource, createSignal, Show, Suspense } from 'solid-js'
import { styled } from 'solid-styled-components'
import styles from './App.module.css'
import logo from './logo.svg'

function App() {
  const [appCount, setAppCount] = createSignal(0)

  const changeTitle = (value) => (window.document.title = `#App: ${value}`)
  createEffect(() => changeTitle(appCount()))

  const doubleIt = (v) => v * 2
  const doubleCount = createMemo(() => doubleIt(appCount()))

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h2>App count: {appCount()}</h2>
        <h3>Double App count: {doubleCount()}</h3>
        <Counter
          initial={appCount()}
          setAppCount={setAppCount} />
        <ResourceExample />
      </header>
    </div>
  )
}

function Counter({ initial, setAppCount }) {
  const [count, setCount] = createSignal(initial || 0)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)

  return (<Card padding={1}>
    <h3>Counter: {count()}</h3>

    <Row>
      <button onClick={decrement}>Decrease</button>
      <button onClick={increment}>Increase</button>
    </Row>

    <Row>
      <button onClick={() => setAppCount((c) => c - 1)}>AppCount Decrease</button>
      <button onClick={() => setAppCount((c) => c + 1)}>AppCount Increase</button>
    </Row>

  </Card>)
}

const Card = styled("div")((props) => ({
  width: '100%',
  'backgroundColor': 'lightsteelblue',
  padding: props.padding + 'rem',
  marginBottom: '1rem'
}))

const Row = styled("div")((props) => ({
  width: '' + (props.width || 40) + '%',
  margin: 'auto',
  padding: '.2rem',
  display: 'flex',
  justifyContent: 'space-evenly',
}))

const ResourceExample = () => {
  const fetchPokemon = async (name) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let data = await response.json()
    return data.sprites.other["official-artwork"].front_default
  }
  const [pokemonName, setPokemonName] = createSignal()
  const [pokemon] = createResource(pokemonName, fetchPokemon)

  const GetPokemon = ({ name }) =>
    (<button onClick={() => setPokemonName(name)}> {name} </button>)
  const ShowPokemon = () => { }

  return (<Card>
    <Row width={60}>
      <GetPokemon name={'abra'} />
      <GetPokemon name={'aron'} />
      <GetPokemon name={'beldum'} />
      <GetPokemon name={'blissey'} />
      <GetPokemon name={'bronzor'} />
      <GetPokemon name={'cherrim'} />
      <GetPokemon name={'drowzee'} />
    </Row>

    {/* <Show when={!pokemon.loading} fallback={<img src={logo} width="300px" height="300px" />}> */}
    {/* <Suspense fallback={<img src={logo} width="300px" height="300px" />}> */}
    <Suspense fallback={<p>Loading...</p>}>
      <img
        width="300px"
        height="300px"
        src={pokemon()}
      />
    </Suspense>
    <hr />
    <img src={logo} width="300px" height="300px" />

  </Card>)
}

export default App
