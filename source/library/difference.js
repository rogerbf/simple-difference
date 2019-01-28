const toString = value => ({}.toString.apply(value))

const difference = (current, next) => {
  if (current !== next) {
    if (toString(current) !== toString(next)) {
      return next || next === null ? next : current
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
          const diff = difference(current[key], next[key])

          if (next[key] || next[key] === 0) {
            return diff
              ? Object.assign(result || {}, {
                  [key]: diff,
                })
              : result
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
