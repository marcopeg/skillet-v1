export const PROJECT_DEFAULTS = {
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
  thresholds: {
    _null: {
      style: { backgroundColor: "#fff1d4" },
      label: "Damn it, fill this stuff"
    },
    _error: {
      style: { backgroundColor: "#f7d4d4" },
      label: "Damn it, fill this stuff"
    },
    values: [
      {
        value: 0,
        style: { backgroundColor: "#fff" },
        label: "I have no idea"
      },
      {
        value: 20,
        style: { backgroundColor: "#e6f3ea" },
        label: "I know the pourpose of it"
      },
      {
        value: 40,
        style: { backgroundColor: "#cee6d4" },
        label: "I have Hello World experience"
      },
      {
        value: 60,
        style: { backgroundColor: "#b5dabf" },
        label: "I can handle tasks"
      },
      {
        value: 80,
        style: { backgroundColor: "#9dcdaa" },
        label: "I feel I'm an expert"
      },
      {
        value: 100,
        style: { backgroundColor: "#84c195" },
        label: "I'm a master of it"
      }
    ]
  }
};
