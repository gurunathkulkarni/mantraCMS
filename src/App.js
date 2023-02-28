import logo from './logo.svg';
import './App.css';
import Sidebar from './Comonents/Sidebar';
import Navbar from './Comonents/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Language from './Comonents/Pages/Language/Language';
import Dashboard from './Comonents/Pages/Dashboard';
import Categories from './Comonents/Pages/Categories';
import God from './Comonents/Pages/God';
import Stotram from './Comonents/Pages/Stotram';

function App() {

    return (
      <div className='App '>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Language" element={<Language />} />
          <Route path="/Categories" element={<Categories/>} />
          <Route path="/God" element={<God />} />
          <Route path="/Stotram" element={<Stotram />} />
          {/* <Route path="/cms/newstype" element={<NewsType />} /> */}
        </Routes>
      </BrowserRouter>
      </div>

    
    );
  };


export default App;
