const separateBy = (number, separator) => {
  if (typeof separator !== 'string' || typeof number !== 'number') {
    return null;
  }
  let result = parseInt(number).toString();
  for (let i = result.length - 3; i > 0; i -= 3) {
    result = result.slice(0, i) + separator + result.slice(i);
  }
  if (number.toString().indexOf('.') > -1) {
    const floatPart = number.toString().slice(number.toString().indexOf('.'));
    result = `${result}${floatPart}`
  }
  return result;
}


export default separateBy;