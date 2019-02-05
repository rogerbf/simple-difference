const { difference } = require(process.env.NODE_ENV === `development`
  ? `../source/main`
  : `../`)

describe(`difference`, () => {
  test(`typeof`, () => {
    expect(typeof difference).toEqual(`function`)
  })

  test(`()`, () => {
    expect(difference()).toEqual(null)
  })

  test(`(1, 1)`, () => {
    const a = 1
    const b = 1

    expect(difference(a, b)).toEqual(null)
  })

  test(`(1, 2)`, () => {
    const a = 1
    const b = 2
    const expected = 2

    expect(difference(a, b)).toEqual(expected)
  })

  test(`('a', 'a')`, () => {
    const a = `a`
    const b = `a`

    expect(difference(a, b)).toEqual(null)
  })

  test(`('a', 'b')`, () => {
    const a = `a`
    const b = `b`
    const expected = `b`

    expect(difference(a, b)).toEqual(expected)
  })

  test(`([ 1, 2, 3 ], [ 1, 2, 3 ])`, () => {
    const a = [ 1, 2, 3 ]
    const b = [ 1, 2, 3 ]
    const expected = null

    expect(difference(a, b)).toEqual(expected)
  })

  test(`([ 1, 2, 3 ], [ 1, 2, 3, 4 ])`, () => {
    const a = [ 1, 2, 3 ]
    const b = [ 1, 2, 3, 4 ]
    const expected = [ 1, 2, 3, 4 ]

    expect(difference(a, b)).toEqual(expected)
  })

  test(`([ 1, 2, 5 ], [ 1, 2, 3, 4 ])`, () => {
    const a = [ 1, 2, 5 ]
    const b = [ 1, 2, 3, 4 ]
    const expected = [ 1, 2, 3, 4 ]

    expect(difference(a, b)).toEqual(expected)
  })

  test(`([ 1, 2, 3, 4 ], [ 1, 2, 5 ])`, () => {
    const a = [ 1, 2, 3, 4 ]
    const b = [ 1, 2, 5 ]
    const expected = [ 1, 2, 5 ]

    expect(difference(a, b)).toEqual(expected)
  })

  test(`({ a: 'a', b: 'b' }, { a: 'a', b: 'c' })`, () => {
    const a = { a: `a`, b: `b` }
    const b = { a: `a`, b: `c` }
    const expected = { b: `c` }

    expect(difference(a, b)).toEqual(expected)
  })

  test(`({ a: 'a', b: { c: 'c', d: 'd' } }, { a: 'a', b: { c: 'c', d: 'e' } })`, () => {
    const a = { a: `a`, b: { c: `c`, d: `d` } }
    const b = { a: `a`, b: { c: `c`, d: `e` } }
    const expected = { b: { d: `e` } }

    expect(difference(a, b)).toEqual(expected)
  })

  test(`({ a: {} }, { a: [] } )`, () => {
    const a = {
      a: {},
    }
    const b = {
      a: [],
    }

    expect(difference(a, b)).toEqual(b)
  })

  test(`({ a: [ 1, 2, 3 ] }, { a: [ 1, 3, 4 ] })`, () => {
    const a = {
      a: [ 1, 2, 3 ],
    }
    const b = {
      a: [ 1, 3, 4 ],
    }

    expect(difference(a, b)).toEqual(b)
  })

  test(`({ a: 'a' }, { a: 'a' })`, () => {
    const a = {
      a: `a`,
    }
    const b = {
      a: `a`,
    }

    expect(difference(a, b)).toEqual(null)
  })

  test(`({ a: { b: 'b' } }, { a: { b: 'b' } })`, () => {
    const a = {
      a: { b: `b` },
    }
    const b = {
      a: { b: `b` },
    }

    expect(difference(a, b)).toEqual(null)
  })

  test(`(undefined, 'b')`, () => {
    const a = undefined
    const b = `b`

    expect(difference(a, b)).toEqual(`b`)
  })

  test(`({ a: { b: 'b' }, c: 'c' }, { a: { b: 'b' } })`, () => {
    const a = { a: { b: `b` }, c: `c` }
    const b = { a: { b: `b` } }

    const expected = { c: undefined }

    expect(difference(a, b)).toEqual(expected)
  })

  test(`(null, null)`, () => {
    expect(difference(null, null)).toEqual(null)
  })

  test(`({ a: 'a' }, { a: null })`, () => {
    expect(difference({ a: `a` }, { a: null })).toEqual({ a: null })
  })

  test(`({ a: 'a' }, { a: undefined })`, () => {
    expect(difference({ a: `a` }, { a: undefined })).toEqual({ a: undefined })
  })

  test(`({ a: 'a' }, { a: 0 })`, () => {
    expect(difference({ a: `a` }, { a: 0 })).toEqual({ a: 0 })
  })

  test(`({ name: 'simple', age: 0 }, { name: 'difference', age: 0 })`, () => {
    expect(
      difference({ name: `simple`, age: 0 }, { name: `difference`, age: 0 })
    ).toEqual({
      name: `difference`,
    })
  })

  test(`([], { string: '' })`, () => {
    expect((1, { string: `` })).toEqual({ string: `` })
  })

  test(`example`, () => {
    const current = {
      one: 1,
      collections: {
        numbers: [ 1, 2, 3 ],
        things: [
          {
            id: 1,
            name: `ball`,
          },
          {
            id: 2,
            name: `plane`,
          },
        ],
      },
    }

    const next = {
      one: 1,
      collections: {
        numbers: [ 1, 2, 3 ],
        things: [
          {
            id: 1,
            name: `ball`,
          },
          {
            id: 2,
            name: `plane`,
          },
          {
            id: 3,
            name: `monkey`,
          },
        ],
      },
    }

    const expected = {
      collections: {
        things: next.collections.things,
      },
    }

    expect(difference(current, next)).toEqual(expected)
  })
})
