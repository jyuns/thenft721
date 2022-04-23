export function date(string) {
    let date = new Date(string)

    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;

    if(hour < 10) hour = '0' + hour;

    if(minute < 10) minute = '0' + minute;
    
    return `${year}-${month}-${day} ${hour}:${minute}`
}

export function ymd(string) {
    let date = new Date(string)

    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;
    
    return `${year}-${month}-${day}`
}

/**export function percentage(string) {
    console.log(string)
} */

export function percentageCheck(value) {
    let string = String(value)
    let flag = string.indexOf('+')
    return flag>=0? 'positive':'negative'
}