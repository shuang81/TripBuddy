module.exports.getFormattedDate = (dbDate) => {
    let date = new Date(dbDate)
    let year = date.getFullYear()
  
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
}

module.exports.getFormattedDateTime = (dbDate) => {
    let date = new Date(dbDate)
    return date.toLocaleString();
}