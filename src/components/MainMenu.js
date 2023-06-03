import './MainMenu.css'
import { Link } from 'react-router-dom';
import logo from '../img/logo2.png';

function MainMenu() {
    return (
        <div className="menu-container">
            <div className="menu-items">
                <img src={logo} alt="Logo" className="menu-item logo-image" />
                <div className="menu-item"><Link to="/nameMenu" className='main-menu-link'><p>JUGAR</p></Link></div>
                <div className="menu-item"><p>INSTRUCCIONES</p></div>
                <div className="menu-item"><p>OPCIONES</p></div>
            </div>
        </div>
    );
}

export default MainMenu;