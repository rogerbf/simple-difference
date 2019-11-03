const toString = value => Object.prototype.toString.apply(value)

const hasOwnProperty = (o, ...args) =>
  Object.prototype.hasOwnProperty.call(o, ...args)

const types = {
  string: toString(""),
  number: toString(0),
  object: toString({}),
  array: toString([]),
  map: toString(new Map()),
  set: toString(new Set()),
}

const difference = (left, right) => {
  const typeofLeft = toString(left)
  const typeOfRight = toString(right)

  if (typeofLeft !== typeOfRight) return { equal: false, diff: right }

  if (typeOfRight === types.number) {
    if (Number.isNaN(left) && Number.isNaN(right)) return { equal: true }
    if (Object.is(left, right)) return { equal: true }
    return { equal: false, diff: right }
  }

  if (left === right) return { equal: true }

  if (typeOfRight === types.string) {
    if (left.toString() == right.toString()) return { equal: true }
  }

  if (typeOfRight === types.array) {
    let returnValue = []

    for (let index = 0; index < right.length; index++) {
      const { diff, equal } = difference(left[index], right[index])
      if (!equal) {
        returnValue.push(diff)
      }
    }

    return returnValue.length
      ? { equal: false, diff: returnValue }
      : { equal: true }
  }

  if (typeOfRight === types.object) {
    const [...keys] = new Set(Object.keys(left).concat(Object.keys(right)))

    const diff = keys.reduce((result, key) => {
      if (hasOwnProperty(left, key)) {
        if (hasOwnProperty(right, key)) {
          const { diff, equal } = difference(left[key], right[key])

          return !equal
            ? Object.assign(result || {}, {
                [key]: diff,
              })
            : result
        } else {
          return Object.assign(result || {}, {
            [key]: undefined,
          })
        }
      } else {
        return Object.assign(result || {}, { [key]: right[key] })
      }
    }, undefined)

    return diff ? { equal: false, diff } : { equal: true }
  }

  if (typeOfRight === types.map) {
    if (left.size !== right.size) return { equal: false, diff: right }

    const iterator = {
      left: left.entries(),
      right: right.entries(),
    }

    let returnValue = new Map()

    for (let index = 0; index < left.size; index++) {
      const currentLeft = iterator.left.next()
      const currentRight = iterator.right.next()

      const key = difference(currentLeft.value[0], currentRight.value[0])
      const value = difference(currentLeft.value[1], currentRight.value[1])

      let updates = [
        key.equal ? currentLeft.value[0] : key.diff,
        value.equal ? currentLeft.value[1] : value.diff,
      ]

      if (!key.equal || !value.equal) returnValue.set(...updates)
    }

    return returnValue.size
      ? { equal: false, diff: returnValue }
      : { equal: true }
  }

  if (typeOfRight === types.set) {
    if (left.size !== right.size) {
      const { equal, diff } = difference([...left], [...right])
      return { equal, diff: new Set(diff) }
    } else {
      const { equal, diff } = difference([...left], [...right])

      return equal ? { equal } : { equal, diff: new Set(diff) }
    }
  }

  return { equal: false, diff: right }
}

export default difference
