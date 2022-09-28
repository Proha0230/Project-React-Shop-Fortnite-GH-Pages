import {useState, useEffect} from 'react';
import {API_KEY, API_URL} from '../config';
import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert'


function Shop () {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState (true);
    const [order, setOrder] = useState ([]);
    const [isBasketShow, setBasketShow] = useState (false);
    const [alertName, setAlertName] = useState ('');

    const closeAlert = ()=> {
        setAlertName('');
    };


// Функция увеличения позиций товара в корзине на +1 (кол-во шт (quantity))
    const incrQuantity = (itemId) => {
        const newOrder = order.map ((el) => {
            if (el.mainId === itemId) {
                const newQuantity = el.quantity +1;
                return {
                    ...el,
                    quantity: newQuantity
                };
            } else {
                return el;
            }
        })
        setOrder(newOrder);
    };

// Функция удаления позиций товара в корзине на -1 (кол-во шт (quantity))
    const decrQuantity = (itemId) => {
        const newOrder = order.map ((el) => {
            if (el.mainId === itemId) {
                const newQuantity = el.quantity -1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        })
        setOrder(newOrder);
    };
    


// функция состояния отображения/скрытия корзины
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    };

// Функция удаления элемента (товара) из корзины
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter ((el) => el.mainId !== itemId);
        setOrder(newOrder);
    };

    const addToBasket = (item) => {
        const itemIndex = order.findIndex ((orderItem) => orderItem.mainId === item.mainId);
        // если Товара нет в корзине то он добавит его и присвоит ему значение quantity: 1 
        // в иконке карзины будет отображаться именно обычное quantity, а не quantity элемента
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
        // методом перебора он поимет есть ли в корзине уже элемент с таким индексом и если есть
        // то он будет добавлять именно ему (элементу) свойство quantity +1
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity +1,
                    };
                    
                } else {
                    return orderItem;
                }
            })
            setOrder (newOrder)
        }
        setAlertName(item.displayName)
    };

    useEffect ( function getGoods () {
        fetch (API_URL, {
            headers: {
                Authorization: API_KEY
            }
        })

        .then ((response) => response.json())
        .then ((data) => {
            setGoods (data.shop);
            setLoading(false);
        });
        
    }, [])

    return (
    <main className="container content">
        <Cart quantity = {order.length} handleBasketShow = {handleBasketShow} />
        {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
        {isBasketShow && <BasketList 
        order = {order} 
        handleBasketShow = {handleBasketShow} 
        removeFromBasket = {removeFromBasket} 
        incrQuantity = {incrQuantity}
        decrQuantity = {decrQuantity} /> }
        {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
    );
}

export {Shop};