import { useContext, useEffect, useRef, useState } from 'react'
import { debounce } from '../services/util.service.js'
import { useEffectUpdate } from '../customHooks/useEffectUpdate.js'
import { ThemeContext } from '../contexts/ThemeContext'
export function ToyFilter({ filterBy, onSetFilterBy }) {
  const { theme, setTheme } = useContext(ThemeContext)
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 1000)).current

  const [isCollapsed, setIsCollapsed] = useState(true)
  const isFirstRender = useRef(true)

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev)
  }

  useEffectUpdate(() => {
    setFilterByToEdit((prev) => {
      if (
        prev.name !== filterBy.name ||
        prev.label !== filterBy.label ||
        prev.inStock !== filterBy.inStock ||
        prev.sortBy !== filterBy.sortBy
      ) {
        return filterBy
      }
      return prev
    })
  }, [filterBy])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onSetFilterByDebounce(filterByToEdit)
    console.log('filterBy:', filterByToEdit)
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
    const newFilterBy = { ...filterByToEdit, [field]: value }
    setFilterByToEdit(newFilterBy)
    onSetFilterByDebounce(newFilterBy)
  }

  const labels = [
    'Classic',
    'Educational',
    'Funny',
    'Action',
    'Creative',
    'STEM',
    'Doll',
    'Battery Powered'
  ]

  return (
    <div
      className={`toy-filter-wrapper ${isCollapsed ? 'filter-collapsed' : ''}`}
    >
      <div
        className={`filter-toggle ${theme ? 'dark' : ''}`}
        onClick={toggleCollapse}
      >
        Filter
      </div>
      <form className={`toy-filter ${theme ? 'dark' : ''}`}>
        <section>
          <label htmlFor='name'>Toy Name</label>
          <input
            value={filterByToEdit.name || ''}
            name='name'
            id='name'
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor='label'>Tags</label>
          <select
            name='label'
            id='label'
            value={filterByToEdit.label || ''}
            onChange={handleChange}
          >
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
            value={filterByToEdit.inStock || ''}
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
            value={filterByToEdit.sortBy || ''}
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
            className={`${theme ? 'dark' : ''}`}
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
