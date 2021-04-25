const scaleSun = 0.001,
  scalePlanetM = 0.033333333,
  scaleDistance = 0.00004;

export const CONFIG = {
  zoom: {
    min: 1.0,
    max: 15.0
  },
  map: {
    size: 10000,
    stars: {
      count: 100,
      width: {
        min: 1,
        max: 9
      }
    }
  },
  planets: {
    scale: 0.5,
    widthSegments: 32,
    heigthSegments: 32,
    sun: {
      radius: 696340 * scaleSun,
      color: "yellow"
    },
    venus: {
      radius: 6051.8 * scalePlanetM,
      color: "whitesmoke",
      distanceToSun: 108200000 * scaleDistance
    },
    earth: {
      radius: 6378.135 * scalePlanetM,
      color: "steelblue",
      distanceToSun: 149600000 * scaleDistance
    }
  }
};
