import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { ThemeContext } from '../contexts/ThemeContext'

export function ToyDetails() {
  const { theme, setTheme } = useContext(ThemeContext)
  const [toy, setToy] = useState(null)
  const params = useParams()
  useEffect(() => {
    loadToy()
  }, [])
  function loadToy() {
    const toyId = params.toyId
    toyService
      .getById(toyId)
      .then(setToy)
      .catch((err) => console.log('cannot load toy', err))
  }
  if (!toy) return <div>Loading...</div>

  const { name, price, labels, inStock, imgUrl } = toy
  return (
    <article className={`toy-details-container  ${theme ? 'dark' : ''}`}>
      <h1>{name}</h1>
      <img src={imgUrl} alt={name} />
      <div className='details'>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <div className='toy-labels'>
          {labels?.map((label) => (
            <Link
              key={label}
              className='toy-label'
              to={`/toy?label=${encodeURIComponent(label)}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <p>
          <strong>Status:</strong> {inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
      <Link to='/toy'>Back to List</Link>
    </article>
  )
}
