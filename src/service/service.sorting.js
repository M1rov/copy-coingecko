
const sortData = (field, list) => {
    list.sort((a, b) => b.props[field] - a.props[field]);
}

export default sortData