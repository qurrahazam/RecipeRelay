import './App.css'
import { useGolbalContext} from "./context";
import Fav from './components/Favorites'
import Meal from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'

export default function App() {
  const {showModal, favorites} = useGolbalContext()
  return (
    <main>
      <Search/>
      {favorites.length > 0 && <Fav/>}
      <Meal/>
      {showModal && <Modal/>}
      
    </main>
  )
}
