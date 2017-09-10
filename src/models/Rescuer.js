import Marker from './Marker';

import find from 'lodash/find';

class Rescuer extends Marker {
  type = 'rescuer'

  get shouldHighlight() {
    return find(this.meta, {name: 'status'}).value === 'available';
  }
}

export default Rescuer;
