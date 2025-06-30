import { Link } from 'react-router-dom'

import { getYearCreated } from '../services/util.service'
import { ThemeContext } from '../contexts/ThemeContext'
import { useContext } from 'react'

export function ToyPreview({ toy }) {
  // console.log('toy.name:', toy.name)
  // console.log('toy.id:', toy._id)
  // console.log('SEED:', `${toy._id}-${toy.name}-random`)

  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <article className={`toy-preview ${theme ? 'dark' : ''}`}>
      <Link to={`/toy/${toy._id}`}>
        <img src={toy.imgUrl} alt={toy.name} />
      </Link>
      <h2>{toy.name}</h2>

      <h4>{toy.price}$</h4>

      <h4>
        <div className='toy-labels'>
          {toy.labels?.map((label) => (
            <Link
              key={label}
              className='toy-label'
              to={`/toy?label=${encodeURIComponent(label)}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </h4>
      <h4>{toy.inStock ? 'In stock' : 'Out of stock'}</h4>
      <h4>Added At: {getYearCreated(toy.createdAt)}</h4>
    </article>
  )
}
