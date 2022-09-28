function Cart (props) {
    const {quantity = 0, handleBasketShow = Function.prototype} = props;
    return(
        <div className="cart light-blue lighten-2 white-text" onClick={handleBasketShow}>
            <i className="material-icons" style={{fontSize: "40px", color: "#000000"}}>local_grocery_store</i>
            {quantity ? (
                <span className="cart_quantity">{quantity}</span>
            ) : null }
        </div>
    );
}

export {Cart};