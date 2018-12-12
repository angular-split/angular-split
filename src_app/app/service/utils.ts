


export function formatDate(date) {
    const year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        millisecond = date.getMilliseconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        secondFormatted = second < 10 ? "0" + second : second,
        millisecondFormatted = millisecond < 100 ? "0" + millisecond : millisecond;

    // return `${ month }/${ day }/${ year } ${ hourFormatted }:${ minuteFormatted }:${ secondFormatted }`;
    return `${ hourFormatted }:${ minuteFormatted }:${ secondFormatted }.${ millisecondFormatted }`;
}