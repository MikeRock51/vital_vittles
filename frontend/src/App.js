import logo from './logo.svg';
import './App.css';
import Toast from './providers/ToastProvider';

function App() {
  return (
    <div className="App">
      <Toast /> 
      <h1 className="text-5xl">Vital Vittles</h1>
    </div>
  );
}

export default App;
