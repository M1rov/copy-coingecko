
const sortData = (field, list, method) => {
    method ? list.sort((a, b) => a[field] - b[field]) : list.sort((a, b) => b[field] - a[field]);
}

export default sortData