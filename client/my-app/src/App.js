import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js';
import Auth from './pages/auth.js';
import CreateRecipes from './pages/create-recipe.js';
import SavedRecipes from './pages/saved-recipes.js';
import Navbar from './components/navbar.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/create-recipe' element={<CreateRecipes/>}/>
            <Route path='/saved-recipes' element={<SavedRecipes/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
