import { useEffect, useState } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function ConfirmModal() {
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBusService.on('confirm-remove', (data) => {
      setModalData(data)
    })

    return () => unsubscribe()
  }, [])

  function onConfirm() {
    if (modalData?.onConfirm) modalData.onConfirm()
    setModalData(null)
  }

  function onCancel() {
    setModalData(null)
  }

  if (!modalData) return null

  return (
    <div className='confirm-modal-backdrop'>
      <section className='confirm-modal'>
        <h2>{modalData.txt || 'Are you sure?'}</h2>
        <div className='modal-actions'>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </section>
    </div>
  )
}
