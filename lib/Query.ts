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
    if (this._path == '')
      throw new Error('No path set for query operation')
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
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }
  gt(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$gt': value }
    return this
  }
  gte(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$gte': value }
    return this
  }
  lt(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$lt': value }
    return this
  }
  lte(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$lte': value }
    return this
  }
  ne(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$ne': value }
    return this
  }
  in(...value: any[]): Query {
    this.check()
    this._conditions[this._path] = { '$in': value }
    return this
  }
  nin(...value: any[]): Query {
    this.check()
    this._conditions[this._path] = { '$nin': value }
    return this
  }

  //////////
  // Logical
  //////////

  or(...values: any[]): Query {
    this.check()
    for (let val of values) {
      if (val instanceof Query)
        val = val.eval()
    }
    this._conditions[this._path] = { '$or': values }
    return this
  }
  and(...values: any[]): Query {
    this.check()
    for (let val of values) {
      if (val instanceof Query)
        val = val.eval()
    }
    this._conditions[this._path] = { '$and': values }
    return this
  }
  not(...values: any[]): Query {
    this.check()
    for (let val of values) {
      if (val instanceof Query)
        val = val.eval()
    }
    this._conditions[this._path] = { '$not': values }
    return this
  }
  nor(...values: any[]): Query {
    this.check()
    for (let val of values) {
      if (val instanceof Query)
        val = val.eval()
    }
    this._conditions[this._path] = { '$nor': values }
    return this
  }

  ////////
  // Elements
  ////////

  exists(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$exists': value }
    return this
  }
  type(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$type': value }
    return this
  }
  //

  mod(divisor: number, reaminder: number): Query {
    this.check()
    this._conditions[this._path] = { '$mod': [divisor, reaminder] }
    return this
  }
  regex(value: RegExp | string): Query {
    this.check()
    if (typeof value === 'string') {
      let split = value.split('/')
      this._conditions[this._path] = { '$regex': split[1], $options: split[3] }
    }
    else
      this._conditions[this._path] = { '$regex': value }
    return this
  }
  text(value: string): Query {
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }

  $where(value: (() => boolean) | string): Query {
    this.check()
    this._conditions[this._path] = { '$where': value }
    return this
  }

  ////////
  // Geospatial
  ////////

  geoWithin(value: GeoJSON.GeometryObject): Query {
    this.check()
    this._conditions[this._path] = { '$geoWithin': value }
    return this
  }
  geoIntersects(value: GeoJSON.GeometryObject): Query {
    this.check()
    this._conditions[this._path] = { '$geoIntersects': value }
    return this
  }
  near(longitude: number, latitude: number, minDistance?: number, maxDistance?: number): Query {
    this.check()
    this._conditions[this._path] = {
      '$near': {
        $geometry: {
          type: 'Point', coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance
      }
    }
    return this
  }
  nearSphere(longitude: number, latitude: number, minDistance?: number, maxDistance?: number): Query {
    this.check()
    this._conditions[this._path] = {
      '$nearSphere': {
        $geometry: {
          type: 'Point', coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance
      }
    }
    return this
  }

  ////////
  // Array
  ////////

  all(...values: any[]): Query {
    this.check()
    this._conditions[this._path] = { '$all': values }
    return this
  }
  elemMatch(...values: any[]): Query {
    this.check()
    this._conditions[this._path] = { '$elemMatch': values }
    return this
  }
  size(value: number): Query {
    this.check()
    this._conditions[this._path] = { '$size': value }
    return this
  }

  ////////
  // Bitwise
  ////////

  bitsAllSet(value: number | number[]): Query {
    this.check()
    this._conditions[this._path] = { '$bitsAllSet': value }
    return this
  }
  bitsAnySet(value: number | number[]): Query {
    this.check()
    this._conditions[this._path] = { '$bitsAnySet': value }
    return this
  }
  bitsAllClear(value: number | number[]): Query {
    this.check()
    this._conditions[this._path] = { '$bitsAllClear': value }
    return this
  }
  bitsAnyClear(value: number | number[]): Query {
    this.check()
    this._conditions[this._path] = { '$bitsAnyClear': value }
    return this
  }

  ////////
  // Comments
  ////////

  comment(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$comment': value }
    return this
  }
  //Projection Operators

  $(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }
  $elemMatch(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }
  meta(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }
  slice(value: any): Query {
    this.check()
    this._conditions[this._path] = { '$eq': value }
    return this
  }
}
