import logo from './logo.svg';
import './App.css';
import Toast from './providers/ToastProvider';
import toast from "react-hot-toast";

toast.success("Toast setup successfully!");

function App() {
  return (
    <div className="App">
      <Toast /> 
      <h1 className="text-5xl">Vital Vittles</h1>
    </div>
  );
}

export default App;
