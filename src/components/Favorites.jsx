import { useGolbalContext } from "../context";
const Fav = () =>{
  const {selectMeal,removeFromFav,favorites} = useGolbalContext()
  return(
    <section className='favorites'>
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className = 'favorites-container'>{favorites.map((meal)=>{
      const {idMeal, strMealThumb:image} = meal;
      return <div key={idMeal} className='favorite-item'>
        <img src={image} className = 'favorites-img img' onClick={()=>selectMeal(idMeal, true)}/>
        <button className='remove-btn' onClick={()=>removeFromFav(idMeal)}>Remove</button>
      </div>
        })}</div>
      </div>
    </section>
  )
}
export default Fav