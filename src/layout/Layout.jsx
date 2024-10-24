/* eslint-disable react/prop-types */
import Navbar from '../components/navbar/Navbar';
import Footer from '../footer/Footer';
import './layout.css';

const Layout = props => {
  return (
    <div className="layout">
      <Navbar></Navbar>
      {props.children}
     <Footer></Footer>
    </div>
  );
};

export default Layout;
