/* eslint-disable react/prop-types */
function Counter({quantity,setQuantity}) {


    const handlerPlus = () => {
        setQuantity(quantity + 1)
    }
    const handlerMinus = () => {
        if(quantity-1 < 0) return 0
        setQuantity(quantity - 1)
    }

  return (
    <div className='flex gap-4 items-center'>
        <button className='border border-black w-10 h-10 rounded-full flex items-center justify-center' onClick={handlerMinus}>-</button>{quantity}<button className='border border-black w-10 h-10 rounded-full flex items-center justify-center' onClick={handlerPlus}>+</button>
    </div>
  )
}

export default Counter