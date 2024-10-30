import Joyride from 'react-joyride'
import useProductTour from '../hooks/useProductTour'
import { steps } from '../helpers/productTourSteps'

const ProductTour = () => {
  const { runTour, handleJoyrideCallback } = useProductTour({ steps })

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar'
      }}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: '#e3ffeb',
          backgroundColor: '#e3ffeb',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: '#3498db',
          textColor: '#004a14',
          width: 300,
          beaconSize: 36,
          zIndex: 1000
        }
      }}
    />
  )
}

export default ProductTour
