import { useState } from "react";
import { useGolbalContext } from "../context";
const Search = () =>{
  const {setSearchTerm, fetchRandomMeal} = useGolbalContext()
  const [text , setText] = useState('')
  const handleChange = (event) =>{
    
    setText(event.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (text){
      setSearchTerm(text)
    }
  }
  const handleRandomMeal = ()=>{
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input type= 'text' placeholder= "Search Meal" className="form-input" value ={text} onChange={handleChange}/>
        <button type = 'submit' className="btn">Search</button>
        <button type = 'submit' className="btn btn-hipster" onClick={handleRandomMeal}>Surprise Me!</button>
      </form>
    </header>
  )
}
export default Search