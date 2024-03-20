import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer/Footer';
import Chatbot from './Pages/Chatbot';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route  path='/login' element={<Login />}/>
        <Route  path='/signup' element={<SignUp />}/>
        <Route  path='/chatbot' element={<Chatbot />}/>



      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
