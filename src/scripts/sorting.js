const sortData = (field, list, method) => {
  if (method === 'descending') {
    return list.sort((a, b) => b[field] - a[field])
  }
  return list.sort((a, b) => a[field] - b[field])
}

export default sortData;