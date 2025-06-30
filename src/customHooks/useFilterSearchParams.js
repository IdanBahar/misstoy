import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setFilterBy } from '../store/toy/toy.action.js'
import { toyService } from '../services/toy.service.js'
import { getExistingProperties } from '../services/util.service'

export function useFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setFilterBy(toyService.getFilterFromSearchParams(searchParams))
  }, [searchParams])

  function setExistFilterSearchParams(filterBy) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      const existing = getExistingProperties(filterBy)

      for (const key of params.keys()) {
        if (!existing[key]) {
          params.delete(key)
        }
      }

      for (const key in existing) {
        params.set(key, existing[key])
      }

      return params
    })
  }

  return setExistFilterSearchParams
}
