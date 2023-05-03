import { useGolbalContext } from "../context";

const Modal = () =>{
  const {selectedMeal, closeModal} = useGolbalContext();
  const {strMealThumb:image, strMeal:tittle, strInstructions:text, strSource: source} = selectedMeal
  return (
    
    <aside className='modal-overlay'>
      <div className = 'modal-container'>
        <img src={image} alt={tittle} className='img modal-img'/>
        <div className = 'modal-content'>
          <h4>{tittle}</h4>
          <p>Cooking Instructions</p>
          <p>{text }</p>
          <a className='model-content a' href={source} target="_blank">Original Source</a>
          <button className='btn btn-hipster close-btn' onClick={closeModal}> close </button>
        </div>
      </div>
    </aside>
  )
}
export default Modal