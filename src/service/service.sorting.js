
const sortData = (field, list, method) => {
    if(method){
        console.log('Here')
        return list.sort((a, b) => a[field] - b[field])
    }
    return list.sort((a, b) => b[field] - a[field])
}

export default sortData