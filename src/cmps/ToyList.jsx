import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview'
import { eventBusService } from '../services/event-bus.service.js'

export function ToyList({ toys = [], onRemoveToy }) {
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} />
          <section className='toy-actions'>
            <button
              onClick={() =>
                eventBusService.emit('confirm-remove', {
                  txt: `Are you sure you want to remove "${toy.name}"?`,
                  onConfirm: () => onRemoveToy(toy._id),
                })
              }
            >
              X
            </button>
            <Link style={{ color: 'white' }} to={`/toy/edit/${toy._id}`}>
              Edit
            </Link>
          </section>
        </li>
      ))}
    </ul>
  )
}
