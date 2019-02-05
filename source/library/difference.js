const toString = value => Object.prototype.toString.apply(value)

const difference = (current, next) => {
  if (current !== next) {
    if (toString(current) !== toString(next)) {
      return next
    } else {
      if (Array.isArray(next)) {
        if (current.length !== next.length) {
          return next
        }

        let result = null

        for (let index = 0; index < next.length; index++) {
          if (difference(current[index], next[index])) {
            result = next
            continue
          } else {
            result = null
          }
        }

        return result
      } else if (typeof next === `object`) {
        const [ ...keys ] = new Set(
          Object.keys(current).concat(Object.keys(next))
        )

        return keys.reduce((result, key) => {
          if (current.hasOwnProperty(key)) {
            if (next.hasOwnProperty(key)) {
              const diff = difference(current[key], next[key])

              return diff !== null || next[key] === null
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
            return Object.assign(result || {}, { [key]: next[key] })
          }
        }, null)
      } else {
        return next
      }
    }
  } else {
    return null
  }
}

export default difference
