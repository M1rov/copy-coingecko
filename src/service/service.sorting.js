
const sortData = (field, list, method) => {
    if(method){
        return list.sort((a, b) => a[field] - b[field])
    }
    return list.sort((a, b) => b[field] - a[field])
}

export default sortData