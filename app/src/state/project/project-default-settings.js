export const PROJECT_DEFAULTS = {
  question: {
    type: "slider",
    options: {
      stars: {
        top: 5,
        style: {
          color: "var(--ion-color-primary)",
          fontSize: 24
        }
      },
      slider: {
        thresholds: {
          _null: {
            style: { backgroundColor: "#fff1d4" },
            label: "Use the slide to set your level:"
          },
          _error: {
            style: { backgroundColor: "#f7d4d4" },
            label: "Damn it, fill this stuff"
          },
          values: [
            {
              applyFrom: 0,
              label: "I have no idea what this is"
            },
            {
              applyFrom: 20,
              label: "I know the pourpose of it"
            },
            {
              applyFrom: 40,
              label: "I have Hello World experience"
            },
            {
              applyFrom: 60,
              label: "I can handle tasks"
            },
            {
              applyFrom: 80,
              label: "I can onboard others"
            },
            {
              applyFrom: 100,
              label: "I feel I could do a tech-talk about it"
            }
          ]
        },
        props: {
          range: {
            min: 0,
            max: 100,
            step: 20,
            snaps: true
          }
        }
      }
    }
  },
  efficiency: {
    // It's the value that is assigned to the score of an empty cell.
    voidValue: -100,

    // It's subtracted from the value of a cell while calculating the score.
    // it should progressively increase in time.
    obsolescence: [
      {
        //       MS     SEC  MIN  HOUR DAYS
        elapsed: 1000 * 60 * 60 * 24 * 60,
        value: 80
      },
      {
        //       MS     SEC  MIN  HOUR DAYS
        elapsed: 1000 * 60 * 60 * 24 * 30,
        value: 50
      },
      {
        //       MS     SEC  MIN  HOUR DAYS
        elapsed: 1000 * 60 * 60 * 24 * 20,
        value: 40
      },
      {
        //       MS     SEC  MIN  HOUR DAYS
        elapsed: 1000 * 60 * 60 * 24 * 10,
        value: 10
      }
    ]
  },
  appearance: {
    thresholds: {
      _null: {
        style: { backgroundColor: "#fff1d4" }
      },
      values: [
        {
          value: 0,
          style: { backgroundColor: "#fff" }
        },
        {
          value: 20,
          style: { backgroundColor: "#e6f3ea" }
        },
        {
          value: 40,
          style: { backgroundColor: "#cee6d4" }
        },
        {
          value: 60,
          style: { backgroundColor: "#b5dabf" }
        },
        {
          value: 80,
          style: { backgroundColor: "#9dcdaa" }
        },
        {
          value: 100,
          style: { backgroundColor: "#84c195" }
        }
      ]
    }
  }
};
