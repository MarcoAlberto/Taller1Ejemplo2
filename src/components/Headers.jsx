import {useState} from "react";

export const Headers=({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal
})=>{
    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };
    const onLessProduct = product => {
        if(product.quantity === 0){
            alert("No hay cantidad seleccionada para este producto")
            return
        }
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };
    const [active, setActive] = useState(false);
    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };
    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    return (
        <header>
            <h1>café Himalaya</h1>
            <div className="container-icon">
                <div className="container-cart-icon" onClick={() => setActive(!active)}>
                    <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito" className="icon-cart" />
                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>
                    </div>
                </div>
                <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                    {allProducts.length ? (
                            <>
                                <div className='row-product'>
                                    {allProducts.map(product => (
                                        <div className='cart-product' key={product.id}>
                                            <div className='info-cart-product'>
                                                <p className='titulo-producto-carrito'>
                                                    {product.title}
                                                </p>
                                                <span className='precio-producto-carrito'>
                                                    ${product.price}
                                                </span>
                                            </div>
                                            <label className="lebal-producto-carrito">Cantidad:</label>
                                            <div className="elementos">
                                                <label className="label-producto-carrito">{product.quantity}</label>
                                                <button className="buttonup-producto-carrito" onClick={() => onAddProduct(product)}>ʌ</button>
                                                <button className="buttondown-producto-carrito" id="menos" onClick={() => onLessProduct(product)}>v</button>
                                            </div>
                                            <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png" alt="cerrar" className="icon-close" onClick={() => onDeleteProduct(product)}/>
                                        </div>
                                    ))}
                                </div>
                                <div className='cart-total'>
                                    <h3>Total:</h3>
                                    <span className='total-pagar'>${total}</span>
                                </div>
                                <button className='btn-clear-all' onClick={onCleanCart}> Vaciar Carrito </button>
                            </>
                        ) : (
                            <p className='cart-empty'>El carrito está vacío</p>
                        )}
                </div>
            </div>
        </header>
    );
};
