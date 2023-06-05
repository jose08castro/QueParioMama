import React from 'react';
import { FaForward, FaRandom, FaWineBottle, FaLink, FaLock, FaHeartbeat } from 'react-icons/fa';
import './Market.css';

function Market({ isOpen, playerScore, handleMarketPurchase}) {

    return (
        <div className={`market-container ${isOpen ? 'open' : ''}`}>
            <div className='market-item-container'>
                {playerScore >= 1 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(1, 0)}>
                        <FaWineBottle size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Añadir botellita<br/>al mazo</span>
            </div>
            <div className='market-item-container'>
                {playerScore >= 1 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(2, 1)}>
                        <FaRandom size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Otra carta</span>
            </div>
            <div className='market-item-container'>
                {playerScore >= 2 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(3, 2)}>
                        <span className="puffy">+2</span>
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Sumatoria</span>
            </div>
            <div className='market-item-container'>
                {playerScore >= 3 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(4, 3)}>
                        <FaForward size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Siguiente</span>
            </div>
            <div className='market-item-container'>
                {playerScore >= 4 ? (
                    <button className="market-button" onClick={() => handleMarketPurchase(5, 4)}>
                        <FaHeartbeat size={35} />
                    </button>
                ) : (
                    <button className="disabled-market-button">
                        <FaLock size={35} />
                    </button>
                )}
                <span className="market-title">Indulto</span>
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