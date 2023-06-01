import './MainMenu.css'
import { Link } from 'react-router-dom';

function MainMenu() {
    return (
        <div className="menu-container">
            <div className="menu-items">
                <h1 className="menu-item">¿Qué parió mamá?</h1>
                <div className="menu-item"><Link to="/nameMenu" className='main-menu-link'><p>JUGAR</p></Link></div>
                <div className="menu-item"><p>INSTRUCCIONES</p></div>
                <div className="menu-item"><p>OPCIONES</p></div>
            </div>
        </div>
    );
}

export default MainMenu;