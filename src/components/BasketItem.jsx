
function BasketItem (props) {
    const {mainId, displayName, price, quantity, removeFromBasket = Function.prototype, incrQuantity = Function.prototype, decrQuantity = Function.prototype} = props;

    return (
        <li className="collection-item" style={{color: "black", fontSize: "20px"}}>
            {displayName} 
            <i className="material-icons basket-quantity" onClick={()=> decrQuantity(mainId)}>remove</i>x{quantity}
            {" "} 
            <i className="material-icons basket-quantity" onClick={()=> incrQuantity(mainId)}>add</i> = {price * quantity} руб.
            <span className="secondary-content" onClick={() => removeFromBasket(mainId)}>
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>
    );
}

export {BasketItem};