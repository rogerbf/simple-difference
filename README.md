# simple-difference

Prefers false positives over false negatives.

## usage

```javascript
import { difference } from "simple-difference"

difference()
// { equal: true }

difference({ name: `simple`, age: 0 }, { name: `difference`, age: 0 })
// { equal: false, diff: { name: `difference` } }

difference([`One`, `Two`], [`One`, `Two`, `Three`])
// { equal: false, diff: [ 'Three' ] }

difference({ numbers: { one: 1 } }, { numbers: { one: 1 } })
// { equal: true }

difference({ numbers: { one: 1 } }, { numbers: { one: 1, two: 2 } })
// { equal: false, diff: { numbers: { two: 2 } } }
```
