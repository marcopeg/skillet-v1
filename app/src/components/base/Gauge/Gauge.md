```js
import { useState } from "react";
const [value, setValue] = useState(50);
<>
  <div>
    <Gauge value={value} label="temperature" units="celsius" />
  </div>
  <p>
    Value:{" "}
    <input
      type="range"
      min={0}
      max={100}
      onChange={e => setValue(e.target.value)}
    />
  </p>
</>;
```
