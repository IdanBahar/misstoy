import { useEffect } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToy, setFilterBy } from '../store/toy/toy.action.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useFilterSearchParams } from '../customHooks/useFilterSearchParams'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

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

  console.log('toys:', toys)
  const { name, label } = filterBy

  return (
    <section className='robot-index'>
      <h1>Welcome to Our amazing toy app!</h1>
      <ToyFilter onSetFilterBy={onSetFilterBy} filterBy={{ name, label }} />

      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>
  )
}
