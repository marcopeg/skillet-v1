```js
import { useState } from "react";
const [value, setValue] = useState(50);
<>
  <div>
    <Gauge value={value} />
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

custom colors:

```js
import { useState } from "react";
const [value, setValue] = useState(50);
<>
  <div>
    <Gauge
      value={value}
      colorArcBackground="lime"
      colorPinFill="red"
      colorArcFillMin="#ddd"
      colorArcFillMax="#333"
    />
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
