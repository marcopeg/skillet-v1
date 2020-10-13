```js
import { useState } from "react";
const [value, setValue] = useState(20);
<IonWrapper bordered height={250}>
  <PropValueForm
    settings={{ type: "stars", options: { stars: { top: 5 } } }}
    propValue={{ name: "Indexes" }}
    propGroup={{ name: "Postgres" }}
    value={value}
    setValue={setValue}
  />
</IonWrapper>;
```
