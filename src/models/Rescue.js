import Marker from './Marker';

import find from 'lodash/find';

class Rescue extends Marker {
  type = 'rescue'

  get shouldHighlight() {
    return find(this.meta, {name: 'status'}).value === 'Awaiting Rescue';
  }
}

export default Rescue;
