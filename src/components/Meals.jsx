import {useGolbalContext} from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';
const Meal = () =>{
  const { meals, loading, selectMeal, addToFav} = useGolbalContext();

  if (loading){
    return (
      <section className='section'>
        <h4>Loading....</h4>
      </section>
    )
  }
  if (meals.length < 1){
    return (
      <section className = 'section'>
        <h5>No Meal Found</h5>
      </section>
    )
  }
  return  ( <section className='section-center'>
      {meals.map((singleMeal)=>{
    const {idMeal, strMeal : tittle, strMealThumb : image} = singleMeal
        return <article key={idMeal} className = 'single-meal'>
          <img src={image} className ='img' onClick={() => selectMeal(idMeal)}/>
          <footer>
            <h5>{tittle}</h5>
              <button className='like-btn' onClick={()=>addToFav(idMeal)}>< BsHandThumbsUp/></button>
          </footer>
        </article>
      })}
    </section>
  );
};
export default Meal