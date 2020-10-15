```js
import useFakeProps from "./use-fake-props";
const {
  slides,
  isFirstSlide,
  canSubmit,
  activeSlide,
  setActiveIndex,
  getValue,
  setValue,
  submitSlide
} = useFakeProps();
<IonWrapper>
  <SlidingQuestions
    slides={slides}
    isFirstSlide={isFirstSlide}
    canSubmit={canSubmit}
    activeSlide={activeSlide}
    setActiveIndex={setActiveIndex}
    getValue={getValue}
    setValue={setValue}
    submitSlide={submitSlide}
  />
</IonWrapper>;
```

```js
import useFakeProps from "./use-fake-props";
<IonWrapper>
  <SlidingQuestions {...useFakeProps(undefined, 1)} />
</IonWrapper>;
```

```js
import useFakeProps from "./use-fake-props";
<IonWrapper width={200}>
  <SlidingQuestions {...useFakeProps(undefined, 0)} />
</IonWrapper>;
```
