import logo from './logo.svg';
import './App.css';
import RegisterForm from './component/RegisterForm';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white py-4 px-6 flex items-center">
        <img className="h-10 w-10" src={logo} alt='logo'/>
        <h1 className="text-xl font-bold">Registration</h1>
      </header>
      <RegisterForm />
     <footer className="bg-gray-800 text-white py-4 px-6 text-center">
     `  <p>&copy; 2023 Revie app. All rights reserved.</p>
     </footer>
    </div>
  );
}

export default App;
