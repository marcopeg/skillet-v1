<!-- ```js
import { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide
} from "@ionic/react";
const [value, setValue] = useState(20);
const slideOpts = {
  initialSlide: 0,
  speed: 400,
  allowTouchMove: false
};
<IonWrapper bordered height={250}>
  <IonCard>
    <IonCardHeader color="primary">Foobar</IonCardHeader>
    <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSlides style={{ height: 250 }}>
              <IonSlide>
                <PropValueForm
                  settings={{ type: "stars", options: { stars: { top: 5 } } }}
                  propValue={{ name: "Indexes" }}
                  propGroup={{ name: "Postgres" }}
                  value={value}
                  setValue={setValue}
                />
              </IonSlide>
            </IonSlides>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>
</IonWrapper>;
``` -->
