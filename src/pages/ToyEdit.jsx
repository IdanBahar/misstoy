import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { saveToy } from '../store/toy/toy.action.js'
export function ToyEdit() {
  const [toy, setToy] = useState(toyService.createToy())

  const navigate = useNavigate()
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) {
      console.log('toy:', toy)
      loadToys()
    }
  }, [toyId])

  function handleChange({ target }) {
    console.log('toy:', toy)
    let { name: field, value, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
      default:
        break
    }
    setToy((toy) => ({ ...toy, [field]: value }))
  }

  async function loadToys() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (error) {
      console.error('Error loading toy:', error)
    }
  }

  async function onSubmitToy(ev) {
    ev.preventDefault()
    console.log('toy:', toy)
    try {
      await saveToy(toy)
      navigate('/toy')
    } catch (error) {
      console.error('Error saving toy:', error)
    }
  }

  const { name, price, labels, inStock } = toy

  //   console.log('name:', name)
  return (
    <section className='toy-edit'>
      <form onSubmit={onSubmitToy}>
        <Link to='/toy'>
          <button className='close-btn' title='Close'>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </Link>
        <h1>
          {toyId ? 'Edit' : 'Add'} {toy.name}
        </h1>
        <label className='form-group' htmlFor='name'>
          Name
        </label>
        <input
          className='form-group'
          onChange={handleChange}
          value={name}
          type='text'
          id='name'
          name='name'
        />

        <label className='form-group' htmlFor='price'>
          Price
        </label>
        <input
          className='form-group'
          onChange={handleChange}
          value={price}
          type='number'
          id='price'
          name='price'
        />

        <fieldset className='checkbox-list'>
          <legend>Labels</legend>
          {[
            'On wheels',
            'Box game',
            'Art',
            'Baby',
            'Doll',
            'Puzzle',
            'Outdoor',
            'Battery Powered',
          ].map((label) => (
            <label className='label-group' key={label}>
              <input
                type='checkbox'
                value={label}
                checked={labels.includes(label)}
                onChange={(ev) => {
                  const value = ev.target.value
                  const isChecked = ev.target.checked
                  setToy((toy) => ({
                    ...toy,
                    labels: isChecked
                      ? [...toy.labels, value]
                      : toy.labels.filter((l) => l !== value),
                  }))
                }}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <label className='form-group' htmlFor='inStock'>
          In Stock
        </label>
        <input
          className='form-group'
          onChange={handleChange}
          checked={inStock}
          type='checkbox'
          id='inStock'
          name='inStock'
        />

        <section className='btns'>
          <button className='btn'>Save</button>
        </section>
      </form>
    </section>
  )
}
