import validateCoords from '../validateCoords';

test.each([
  ['-8.4980497, 115.2704135', true],
  ['[51.50851,-0.123232]', true],
  ['-51.245,0.123232', true],
  ['string', false],
  ['23,4, -45.2', false],
  ['[[23.4567, -0.1234]]', false],
  ['-1.4567, 45,1', false],
  ['  -12.123,   -45.1233456', true],
])(
  'Введенные координаты %s %s',
  (coords, expected) => {
    const received = validateCoords(coords);
    expect(received).toEqual(expected);
  },
);
