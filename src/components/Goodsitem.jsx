function GoodsItem (props) {
    const {mainId, displayName, displayDescription, price, displayAssets, addToBasket = Function.prototype} = props;
    
    return(
        <div className="card" style={{margin: "0.5rem"}}>
        <div className="card-image">
            <img src={displayAssets[0].full_background} alt = {displayName} />
        </div>
        <div className="card-content">
            <span className="card-title" style={{color: "black", fontWeight:"normal"}}>{displayName}</span>
            <p style={{fontWeight:"bold", fontSize:" 17px"}}>{displayDescription}</p>
        </div>
        <div className="card-action">
            <button className="btn" onClick={ ()=> addToBasket({mainId, displayName, price:price.finalPrice}) }>Купить</button>
            <span className="right" style={{fontSize: "1.8rem"}}>
                {price.finalPrice} руб.
            </span>
        </div>
        </div>
    );
}

export {GoodsItem};