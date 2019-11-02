# simple-difference

Prefers false positives over false negatives.

## usage

```javascript
import { difference } from "simple-difference"

difference().equal
// true

difference({ name: `simple`, age: 0 }, { name: `difference`, age: 0 })
// { equal: false, diff: { name: `difference` } }

difference([`One`, `Two`], [`One`, `Two`, `Three`]).diff
// [ `One`, `Two`, `Three` ]

difference({ numbers: { one: 1 } }, { numbers: { one: 1 } }).diff
// null

difference({ numbers: { one: 1 } }, { numbers: { one: 1, two: 2 } }).diff
// { numbers: { two: 2 } }
```
