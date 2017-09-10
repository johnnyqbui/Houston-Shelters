import extend from 'lodash/extend';
import pick from 'lodash/pick';
import map from 'lodash/map';
import zipObject from 'lodash/zipObject';
import intersection from 'lodash/intersection';
import concat from 'lodash/concat';
import difference from 'lodash/difference';
import words from 'lodash/words';
import capitalize from 'lodash/capitalize';

import moment from 'moment';

const locationKeys = [
  'name',
  'address',
  'city',
  'state',
  'zip',
  'phone',
  'latitude',
  'longitude'
];

const formatters = {
  updatedAt: (value) => (moment(value).format('L LT')),
  boolean: (value) => value? 'Yes' : 'No'
};

class Marker {
  constructor(fields, filters, data) {
    this._location = {};
    this._meta = {};

    this._fields = fields;
    this._filters = filters;

    this.data = data;
  }

  get fields() {
    return map(concat(this._fields, [{name: 'updatedAt'}]), (field) => {
      return extend({
        friendlyName: capitalize(words(field.name).join(' '))
      }, field);
    });
  }

  get locationKeys() {
    return intersection(map(this.fields, 'name'), locationKeys);
  }

  get metaKeys() {
    return difference(map(this.fields, 'name'), locationKeys);
  }

  get friendlyKeys() {
    return zipObject(map(this.fields, 'name'), map(this.fields, 'friendlyName'));
  }

  get typedKeys() {
    return zipObject(map(this.fields, 'name'), map(this.fields, 'type'));
  }

  formatLocation(locationData) {
    const {phone} = locationData;
    return extend({
      phoneFormatted: (locationData.phone && locationData.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')),
      fullAddress: `${locationData.address} ${locationData.city}, ${locationData.state} ${locationData.zip}`,
      fullAddressEncoded: encodeURI(`${locationData.address} ${locationData.city}, ${locationData.state} ${locationData.zip}`),
      fullAddressDisplay: [locationData.address, `${locationData.city}, ${locationData.state} ${locationData.zip}`],
      position: [locationData.latitude, locationData.longitude],
      latLng: {
        lat: locationData.latitude,
        lng: locationData.longitude
      }
    }, locationData);
  }

  format(data) {
    return map(data, (value, name) => {
      const type = this.typedKeys[name];
      return {
        name,
        value: value,
        valueFormatted: ((formatters[name] && formatters[name](value)) || (formatters[type] && formatters[type](value))) || capitalize(value),
        label: `${this.friendlyKeys[name]}${((type === 'boolean' && '?') || ':')} `,
        type: type
      };
    });
  }

  formatMeta(metaData) {
    return this.format(metaData);
  }

  get location() {
    return this.formatLocation(this._location);
  }

  set location(data) {
    extend(this._location, pick(data, this.locationKeys));

    return this._location;
  }

  get meta() {
    return this.formatMeta(this._meta);
  }

  set meta(data) {
    extend(this._meta, pick(data, this.metaKeys));

    return this._meta;
  }

  set data(data) {
    this.location = data;
    this.meta = data;
  }

  get shouldHighlight() {
    return false;
  }
}

export default Marker;
