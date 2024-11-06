export const SearchItem = ({search, setSearch}) => {
  return (
    <div>
        <form onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor="search">Search</label>
            <input type="text" placeholder="search" id="search" role="searchbox" value={search} onChange={(e)=>setSearch(e.target.value)} />

        </form>
    </div>
  )
}
