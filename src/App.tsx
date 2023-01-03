import './App.css';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <div className="App">
      <h1 style={{
        color: '#85586F', fontFamily: 'Roboto Slab', margin: '2rem'
      }}>Encontre seu endereço</h1>
      <div className='infoAddress'>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
