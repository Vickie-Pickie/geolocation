export default function validateCoords(coords) {
  const arrCoords = coords.split(',');
  if (arrCoords.length !== 2) {
    return false;
  }
  arrCoords[0] = arrCoords[0].trim();
  arrCoords[1] = arrCoords[1].trim();
  if (arrCoords[0][0] === '[') {
    arrCoords[0] = arrCoords[0].substring(1);
  }

  if (arrCoords[1][arrCoords[1].length - 1] === ']') {
    arrCoords[1] = arrCoords[1].substring(0, arrCoords[1].length - 1);
  }

  // eslint-disable-next-line no-restricted-globals
  return isFinite(arrCoords[0]) && isFinite(arrCoords[1]);
}
