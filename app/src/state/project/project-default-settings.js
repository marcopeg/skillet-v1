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
    ],

    // @DEPRECATED
    // It's considered the minimum value for a cell to represent
    // a proficient level of competence for the relative skill
    baseline: 60,

    // @DEPRECATED
    // Amount of time in milliseconds withinc which a score is considered
    // to be up-to-date.
    //            MS     SEC  MIN  HOUR DAYS
    // obsolescence: 1000 * 60 * 60 * 24 * 30,
    // obsolescence: 1000 * 20,

    // @DEPRECATED
    // Multipliers are used to generate a global score that can
    // factor in multiple dimensions and produce a single 0-1 value
    // that could represent the proficiency of an area of the board.
    multipliers: {
      completionRate: 0,
      completionGapRate: 100,
      updatedEntriesRate: 0,
      obsolentEntriesRate: 50,
      entriesScore: 0,
      boardScore: 100
    }
  },
  thresholds: {
    _null: {
      style: { backgroundColor: "#f9caca" },
      label: "Damn it, fill this stuff"
    },
    _error: {
      style: { backgroundColor: "#ff1c1c" },
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
        style: { backgroundColor: "#DFEED4" },
        label: "I know the pourpose of it"
      },
      {
        value: 40,
        style: { backgroundColor: "#CCE8B5" },
        label: "I have Hello World experience"
      },
      {
        value: 60,
        style: { backgroundColor: "#B2DD8B" },
        label: "I can handle tasks"
      },
      {
        value: 80,
        style: { backgroundColor: "#97D35E" },
        label: "I feel I'm an expert"
      },
      {
        value: 100,
        style: { backgroundColor: "#70c619" },
        label: "I'm a master of it"
      }
    ]
  }
};
