
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/Layout';
import Routes from './components/routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Routes/>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
