# simple-difference

simple  
_adj_ **feeble-minded; not intelligent**

difference  
_noun_ **dissimilarity, distinctness**

## usage

```javascript
import { difference } from "simple-difference"

difference(
  { name: `simple`, age: 0 },
  { name: `difference`, age: 0 }
)
// { name: `difference` }

difference(
  [ `One`, `Two` ],
  [ `One`, `Two`, `Three` ]
)
// [ `One`, `Two`, `Three` ]

difference(
  { numbers: { one: 1 } },
  { numbers: { one: 1 } }
)
// null

difference(
  { numbers: { one: 1 } },
  { numbers: { one: 1, two: 2 } }
)
// { numbers: { two: 2 } }
```
