function assign(...args: any[]) { // .length of function is 2
  'use strict';
  if (args[0] == null) { // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(args[0]);

  for (var index = 1; index < args.length; index++) {
    var nextSource = args[index];

    if (nextSource != null) { // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

export class Query {
  private _conditions: any = {}
  private _path: string = ''
  /**
   * Create a new query object.
   */
  static create(): Query {
    return new Query()
  }

  private check(): void {
    if (this._conditions == {} && this._path == '')
      throw new Error('No path set for root query operation')
  }

  private uncheckedSet(query: any): void {
    if (this._path != '')
      this._conditions[this._path] = assign({}, this._conditions[this._path], query)
    else
      this._conditions = query
  }

  private checkedSet(query: any): void {
    this.check()
    this._conditions[this._path] = assign({}, this._conditions[this._path], query)
  }

  /**
   * Set new path for next queries
   *
   * @param {string} path Path that will be set
   */
  where(path: string, value?: any): Query {
    if (value !== undefined)
      this._conditions[path] = value
    else
      this._path = path
    return this
  }

  /**
   * Evaluate this Query object to a MongoDB query.
   */
  eval(): any {
    return this._conditions
  }

  ////////
  // Comparison
  ////////

  eq(value: any): Query {
    this.checkedSet({ '$eq': value })
    return this
  }
  gt(value: any): Query {
    this.uncheckedSet({ '$gt': value })
    return this
  }
  gte(value: any): Query {
    this.uncheckedSet({ '$gte': value })
    return this
  }
  lt(value: any): Query {
    this.uncheckedSet({ '$lt': value })
    return this
  }
  lte(value: any): Query {
    this.uncheckedSet({ '$lte': value })
    return this
  }
  ne(value: any): Query {
    this.checkedSet({ '$ne': value })
    return this
  }
  in(...value: any[]): Query {
    this.checkedSet({ '$in': value })
    return this
  }
  nin(...value: any[]): Query {
    this.checkedSet({ '$nin': value })
    return this
  }

  //////////
  // Logical
  //////////

  or(...values: any[]): Query {
    let temp: any[] = []
    for (let val of values) {
      if (val instanceof Query)
        temp.push(val.eval())
      else temp.push(val)
    }
    this.uncheckedSet({ '$or': temp })
    return this
  }
  and(...values: any[]): Query {
    let temp: any[] = []
    for (let val of values) {
      if (val instanceof Query)
        temp.push(val.eval())
      else temp.push(val)
    }
    this.uncheckedSet({ '$and': temp })
    return this
  }
  not(value: any): Query {
    if (value instanceof Query)
      this.uncheckedSet({ '$not': value.eval() })
    else this.uncheckedSet({ '$not': value })
    return this
  }
  nor(...values: any[]): Query {
    let temp: any[] = []
    for (let val of values) {
      if (val instanceof Query)
        temp.push(val.eval())
      else temp.push(val)
    }
    this.uncheckedSet({ '$nor': temp })
    return this
  }

  ////////
  // Elements
  ////////

  exists(value: any): Query {
    this.checkedSet({ '$exists': value })
    return this
  }
  type(value: any): Query {
    this.checkedSet({ '$type': value })
    return this
  }
  //

  mod(divisor: number, reaminder: number): Query {
    this.checkedSet({ '$mod': [divisor, reaminder] })
    return this
  }
  regex(value: RegExp | string): Query {
    if (typeof value === 'string') {
      let split = value.split('/')
      this.checkedSet({ '$regex': split[1], $options: split[3] })
    }
    else
      this.checkedSet({ '$regex': value })
    return this
  }
  text(value: string): Query {
    this.checkedSet({ '$eq': value })
    return this
  }

  $where(value: (() => boolean) | string): Query {
    this.checkedSet({ '$where': value })
    return this
  }

  ////////
  // Geospatial
  ////////

  geoWithin(value: GeoJSON.GeometryObject): Query {
    this.checkedSet({ '$geoWithin': value })
    return this
  }
  geoIntersects(value: GeoJSON.GeometryObject): Query {
    this.checkedSet({ '$geoIntersects': value })
    return this
  }
  near(longitude: number, latitude: number, minDistance?: number, maxDistance?: number): Query {
    this.checkedSet({
      '$near': {
        $geometry: {
          type: 'Point', coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance
      }
    })
    return this
  }
  nearSphere(longitude: number, latitude: number, minDistance?: number, maxDistance?: number): Query {
    this.checkedSet({
      '$nearSphere': {
        $geometry: {
          type: 'Point', coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance
      }
    })
    return this
  }

  ////////
  // Array
  ////////

  all(...values: any[]): Query {
    this.checkedSet({ '$all': values })
    return this
  }
  elemMatch(...values: any[]): Query {
    this.checkedSet({ '$elemMatch': values })
    return this
  }
  size(value: number): Query {
    this.checkedSet({ '$size': value })
    return this
  }

  ////////
  // Bitwise
  ////////

  bitsAllSet(value: number | number[]): Query {
    this.checkedSet({ '$bitsAllSet': value })
    return this
  }
  bitsAnySet(value: number | number[]): Query {
    this.checkedSet({ '$bitsAnySet': value })
    return this
  }
  bitsAllClear(value: number | number[]): Query {
    this.checkedSet({ '$bitsAllClear': value })
    return this
  }
  bitsAnyClear(value: number | number[]): Query {
    this.checkedSet({ '$bitsAnyClear': value })
    return this
  }

  ////////
  // Comments
  ////////

  comment(value: any): Query {
    this.checkedSet({ '$comment': value })
    return this
  }

  ////////
  // Projection Operators
  ////////

  $(value: any): Query {
    this.checkedSet({ '$eq': value })
    return this
  }
  $elemMatch(value: any): Query {
    this.checkedSet({ '$eq': value })
    return this
  }
  meta(value: any): Query {
    this.checkedSet({ '$eq': value })
    return this
  }
  slice(value: any): Query {
    this.checkedSet({ '$eq': value })
    return this
  }
}
