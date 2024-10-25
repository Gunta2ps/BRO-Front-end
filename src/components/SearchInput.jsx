/* eslint-disable react/prop-types */
function SearchInput({ searchQuery, handleSearch ,getStore}) {
    return (
      <div className="bg-white flex px-1 py-1 w-3/4 h-12 rounded-lg  border border-[#16325B] overflow-hidden  mx-auto font-[sans-serif]">
          <input 
          type='email' 
          placeholder='Search Something...' 
          value={searchQuery} 
          onChange={(e) => handleSearch(e.target.value)} 
          className="w-full outline-none bg-white pl-4 text-sm" />
          <button 
          type='button'
          onClick={()=>getStore()} 
          className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 px-4 flex items-center hover:bg-[#16325B] hover:text-white ">Search</button>
      </div>
    )
  }
  
  export default SearchInput