import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setFilterBy } from '../store/toy/toy.action.js'
import { toyService } from '../services/toy.service.js'
import { getExistingProperties } from '../services/util.service'

export function useFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setFilterBy(toyService.getFilterFromSearchParams(searchParams))
  }, [])

  function setExistFilterSearchParams(filterBy) {
    setSearchParams(getExistingProperties(filterBy))
  }

  return setExistFilterSearchParams
}
