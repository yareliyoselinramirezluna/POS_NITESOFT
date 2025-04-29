const QuantityButton = ({ quantity, onIncrement, onDecrement }) => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-purple-300 text-purple-800 rounded-lg hover:bg-purple-400"
          onClick={onDecrement}
        >
          −
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          className="w-8 h-8 flex items-center justify-center bg-purple-300 text-purple-800 rounded-lg hover:bg-purple-400"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    );
  };
  
  export default QuantityButton;  