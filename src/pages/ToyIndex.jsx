import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToy, setFilterBy } from '../store/toy/toy.action.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { Outlet } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  const setExistSearchParams = useFilterSearchParams()

  useEffect(() => {
    loadToys()
    setExistSearchParams(filterBy)
  }, [filterBy])

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg('Toy removed successfully!')
    } catch (error) {
      showErrorMsg(`Having issues removing toy (${toyId})`)
      console.log('Error ->', error)
    }
  }
  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  // console.log('toys:', toys)
  const { name, label, inStock, sortBy } = filterBy

  return (
    <section className='toy-index'>
      <ToyFilter
        onSetFilterBy={onSetFilterBy}
        filterBy={{ name, label, inStock, sortBy }}
      />

      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      <Outlet />
    </section>
  )
}
