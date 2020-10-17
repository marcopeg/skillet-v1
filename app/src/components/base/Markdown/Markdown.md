```js
const md = `
### Hello _World_:

- item 1
- item 3

[External link][1]
[Internal link][2]

[1]: http://google.com "External link"
[2]: /internal "Internal link"
`;
<Markdown source={md} />;
```
