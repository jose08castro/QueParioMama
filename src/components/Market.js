import React from 'react';
import { FaForward, FaRandom, FaWineBottle, FaLink, FaLock, FaTrophy, FaSkull, FaHeartbeat, FaArrowUp } from 'react-icons/fa';
import './Market.css';

function Market({ isOpen, playerMoney, handleMarketPurchase}) {

    return ( 
        <div className={`market-container ${isOpen ? 'open' : ''}`}>
            <div className='currency'>
            <FaTrophy size={30}/>
            &nbsp;
            {playerMoney}
            </div>
            <div className='market-item-container'>
            <span className="market-title">Subir nivel</span>
                {playerMoney >= 1 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(1, 0)}>
                        <FaArrowUp size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <div className='price'>
                    <span>1</span>
                </div>
            </div>
            <div className='market-item-container'>
                <span className="market-title">Aleatorio</span>
                {playerMoney >= 2 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(2, 1)}>
                        <FaRandom size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <div className='price'>
                    <span>2</span>
                </div>
            </div>
            <div className='market-item-container'>
            <span className="market-title">Maldición</span>
                {playerMoney >= 3 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(3, 2)}>
                        <FaSkull size={35} />
                        {/* <span className="puffy">+2</span> */}
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <div className='price'>
                    <span>3</span>
                </div>
            </div>
            <div className='market-item-container'>
                <span className="market-title">Siguiente</span>
                {playerMoney >= 4 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(4, 3)}>
                        <FaForward size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <div className='price'>
                    <span>4</span>
                </div>
            </div>
            <div className='market-item-container'>
                <span className="market-title">Exorcismo</span>
                {playerMoney >= 5 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(5, 4)}>
                        <FaHeartbeat size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <div className='price'>
                    <span>5</span>
                </div>
            </div>
            {/* <div className='market-item-container'>
                {playerMoney >= 5 ? (
                    <button className="market-button">
                        <FaLink size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Compañero</span>
            </div> */}
        </div>
    );
}

export default Market;