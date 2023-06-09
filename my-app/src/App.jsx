import './App.css';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './views/Layout';
import Single from './views/Single';
import Profile from './views/Profile';
import Login from './views/Login';
import {MediaProvider} from './contexts/MediaContext';
import Logout from './views/Logout';
import Landing from './views/Landing';
import Upload from './views/Upload';

console.log('base', import.meta.env.BASE_URL);

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

export default App;
