import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { getYearCreated } from '../services/util.service'
import Sergeant from '../assets/PngItem_7093.png'
import Hamm from '../assets/PngItem_8473.png'
import Buzz from '../assets/PngItem_5369982.png'
import Woddy from '../assets/PngItem_7737.png'
import Rex from '../assets/PngItem_6498.png'
import Jessie from '../assets/PngItem_465253.png'
import Bullseye from '../assets/PngItem_494826.png'
import MrsPotato from '../assets/PngItem_464551.png'
import Alien from '../assets/22981-7-toy-story-alien-file.png'
import group from '../assets/68781-jessie-story-toy-file-sheriff-characters-buzz.png'
import DeadPool from '../assets/deadpool.png'
import Batman from '../assets/batman.png'
import Ironman from '../assets/ironman.png'
import Xmen from '../assets/xmen.png'
import Captain from '../assets/captain.png'
export function ToyPreview({ toy }) {
  // console.log('toy.name:', toy.name)
  // console.log('toy.id:', toy._id)
  // console.log('SEED:', `${toy._id}-${toy.name}-random`)
  const navigate = useNavigate()

  function onLabelClick(label) {
    navigate(`/toy?label=${label}`)
  }
  const toyImagesArr = [
    Sergeant,
    Hamm,
    Buzz,
    Woddy,
    Rex,
    Jessie,
    Bullseye,
    MrsPotato,
    Alien,
    group,
    DeadPool,
    Batman,
    Ironman,
    Xmen,
    Captain,
  ]
  const imgIdx =
    Math.abs([...toy._id].reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
    toyImagesArr.length

  const imgUrl = toyImagesArr[imgIdx]

  return (
    <article className='toy-preview'>
      <Link to={`/toy/${toy._id}`}>
        <img src={imgUrl} alt={toy.name.replace(/\s/g, '')} />
      </Link>
      <h2>{toy.name}</h2>

      <h4>{toy.price}$</h4>

      <h4>
        <div className='toy-labels'>
          {toy.labels?.map((label) => (
            <span
              key={label}
              className='toy-label'
              onClick={() => onLabelClick(label)}
            >
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
