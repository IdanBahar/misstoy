import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview'
import { eventBusService } from '../services/event-bus.service.js'

export function ToyList({ toys = [], onRemoveToy }) {
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <li key={toy.id}>
          <ToyPreview toy={toy} />
          <section className='toy-actions'>
            <button
              onClick={() =>
                eventBusService.emit('confirm-remove', {
                  txt: `Are you sure you want to remove "${toy.name}"?`,
                  onConfirm: () => onRemoveToy(toy.id),
                })
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Link style={{ color: 'white' }} to={`/toy/edit/${toy.id}`}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </section>
        </li>
      ))}
    </ul>
  )
}
