import {FaPlus} from 'react-icons/fa';
export const AddItem = ({newItem, setItem, handleSubmit}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add item</label>
            <input type="text" required id="addItem" value={newItem} onChange={(e)=> setItem(e.target.value)}/>
            <button type="submit">
                <FaPlus/>
            </button>

        </form>
    </>
  )
}
