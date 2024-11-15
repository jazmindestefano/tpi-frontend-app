import { FC, MouseEvent, ReactNode } from 'react'
import ReactDom from 'react-dom'

interface BaseModalProps {
  show: boolean
  onClose: () => void
  children: ReactNode
}

const Overlay: FC<BaseModalProps> = ({ show, onClose, children }) => {
  const handleClose = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const portalElement = document.getElementById('portal')
  if (!portalElement) {
    return null
  } else {
    return ReactDom.createPortal(
      <>
        {show && (
          <div
            onClick={handleClose}
            className={`w-screen fixed top-0 left-0 bg-black bg-opacity-70 backdrop-blur-[2px] z-50 flex justify-center items-center h-full`}
          >
            {children}
          </div>
        )}
      </>,
      portalElement
    )
  }
}

export default Overlay
