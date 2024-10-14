/* eslint-disable react/prop-types */


const ToggleButton = ({handleToggle, isChecked}) => {


  
    return (
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input type="checkbox" name="toggle"id="toggle"className="hidden"checked={isChecked}onChange={handleToggle}
        />
        <label htmlFor="toggle" className={`${
            isChecked ? 'bg-[#16325B]' : 'bg-[#16325B]'
          } relative block h-6 w-10 rounded-full cursor-pointer`}
        >
          <span className={`${
              isChecked ? 'translate-x-5' : 'translate-x-1'
            } absolute top-1/2 -mt-2 w-4 h-4 bg-white rounded-full transition-transform`}
          />
        </label>
      </div>
    );
};

export default ToggleButton;