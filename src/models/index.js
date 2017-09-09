import Marker from './Marker';

import Rescuee from './Rescuee';
import Rescuer from './Rescuer';
import PointOfInterest from './PointOfInterest';

const Models = {
  'rescuees': Rescuee,
  'rescuers': Rescuer,
  'point-of-interest': PointOfInterest
};

export default Models;
export const getModel = (type) => {
  return (Models[type] || Marker);
};
