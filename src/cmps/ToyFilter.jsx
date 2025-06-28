import { useEffect, useRef, useState } from 'react'
import { debounce } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current
  const [isCollapsed, setIsCollapsed] = useState(true)

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev)
  }

  useEffect(() => {
    onSetFilterByDebounce(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { name: field, value, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      case 'select-one':
        if (field === 'inStock')
          value = value === 'true' ? true : value === 'false' ? false : ''
        break
      default:
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { name, label, inStock, sortBy } = filterByToEdit
  const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]

  return (
    <div
      className={`toy-filter-wrapper ${isCollapsed ? 'filter-collapsed' : ''}`}
    >
      <div className='filter-toggle' onClick={toggleCollapse}>
        Filter
      </div>
      <form className='toy-filter'>
        <section>
          <label htmlFor='name'>Toy Name</label>
          <input value={name} name='name' id='name' onChange={handleChange} />
        </section>
        <section>
          <label htmlFor='label'>Tags</label>
          <select name='label' id='label' value={label} onChange={handleChange}>
            <option value=''>All</option>
            {labels.map((lbl) => (
              <option key={lbl} value={lbl}>
                {lbl}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor='inStock'>Stock</label>
          <select
            name='inStock'
            id='inStock'
            value={inStock}
            onChange={handleChange}
          >
            <option value=''>All</option>
            <option value='true'>In Stock</option>
            <option value='false'>Out of Stock</option>
          </select>
        </section>
        <section>
          <label htmlFor='sortBy'>Sort By</label>
          <select
            name='sortBy'
            id='sortBy'
            value={sortBy}
            onChange={handleChange}
          >
            <option value=''>None</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
            <option value='createdAt'>Created</option>
          </select>
        </section>
        <section>
          <button
            type='button'
            onClick={() =>
              setFilterByToEdit({
                name: '',
                label: '',
                inStock: '',
                sortBy: '',
              })
            }
          >
            Clear
          </button>
        </section>
      </form>
    </div>
  )
}
