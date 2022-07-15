import { useSelector } from "react-redux"
import parse from 'html-react-parser';

const MapSelector = ({selectedOffice}) => {
  const Floor = useSelector(state => state.selectedFloor)

  const svgString = (selectedOffice.maps && selectedOffice.maps.find(map => Floor in map)) ? selectedOffice.maps.find(map => Floor in map)[Floor] : '</>'

  return (
    <>
      <div className="Container">{parse(svgString)}</div>
    </>

  )

}

export default MapSelector