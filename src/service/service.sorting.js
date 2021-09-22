
const sortData = (field, list) => {
    list.sort((a, b) => b[field] - a[field]);
    console.log(list)
}

export default sortData