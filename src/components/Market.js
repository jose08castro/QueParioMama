import React from 'react';
import { FaForward, FaRandom, FaWineBottle, FaLink, FaLock, FaHeartbeat, FaTrophy } from 'react-icons/fa';
import './Market.css';

function Market({ isOpen, playerScore, handleMarketPurchase}) {

    return ( 
        <div className={`market-container ${isOpen ? 'open' : ''}`}>
            <div className='currency'>
            <FaTrophy size={30}/>
            &nbsp;
            {playerScore}
            </div>
            <div className='market-item-container'>
            <span className="market-title">Botellita</span>
                {playerScore >= 1 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(1, 0)}>
                        <FaWineBottle size={35} />
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
                {playerScore >= 2 ? (
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
            <span className="market-title">Sumatoria</span>
                {playerScore >= 3 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(3, 2)}>
                        <span className="puffy">+2</span>
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
                {playerScore >= 4 ? (
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
                <span className="market-title">Indulto</span>
                {playerScore >= 5 ? (
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
                {playerScore >= 5 ? (
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