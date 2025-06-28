import { Link } from 'react-router-dom'
import { getYearCreated } from '../services/util.service'
import Sergeant from '../assets/PngItem_7093.png'
import Hamm from '../assets/PngItem_8473.png'
import Buzz from '../assets/PngItem_5369982.png'
import Woddy from '../assets/PngItem_7737.png'
import Rex from '../assets/PngItem_6498.png'
import Jessie from '../assets/PngItem_465253.png'
import Bullseye from '../assets/PngItem_494826.png'
import MrsPotato from '../assets/PngItem_464551.png'

export function ToyPreview({ toy }) {
  // console.log('toy.name:', toy.name)
  // console.log('toy.id:', toy._id)
  // console.log('SEED:', `${toy._id}-${toy.name}-random`)
  const toyImages = {
    Sergeant: Sergeant,
    Hamm,
    Buzz,
    Woddy,
    Rex,
    Jessie,
    Bullseye,
    MrsPotato,
  }

  return (
    <article className='toy-preview'>
      <Link to={`/toy/${toy._id}`}>
        <img
          src={
            Object.values(toyImages)[
              Math.floor(Math.random() * Object.values(toyImages).length)
            ]
          }
          alt={toy.name.replace(/\s/g, '')}
        />
      </Link>
      <h2>{toy.name}</h2>

      <h4>{toy.price}$</h4>

      <h4>
        <div className='toy-labels'>
          {toy.labels?.map((label) => (
            <span key={label} className='toy-label'>
              {label}
            </span>
          ))}
        </div>
      </h4>
      <h4>{toy.inStock ? 'In stock' : 'Out of stock'}</h4>
      <h4>Added At: {getYearCreated(toy.createdAt)}</h4>
    </article>
  )
}
