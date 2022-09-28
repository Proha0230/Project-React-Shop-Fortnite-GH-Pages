import { useEffect } from "react";

function Alert (props) {
    const { name = '', closeAlert = Function.prototype } = props;
    useEffect (()=> {
        const timerId = setTimeout (closeAlert, 3000);
        return ()=> {
            clearTimeout(timerId);
        };
        // eslint-disable-next-line
    }, [name]);

    return (
        <div id="toast-container">
            <div className="toast light-blue lighten-2 black-text" style={{fontSize: "20px", fontWeight:"normal"}}>Товар {name} добавлен в корзину</div>
        </div>
    );
}

export {Alert};