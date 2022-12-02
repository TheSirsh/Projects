function timeConvert(timeValue) {
    let str = '';
    if (timeValue < 10) {
        str = 'Time: 00:0' + timeValue
    }
    else if (timeValue < 60) {
        str = 'Time: 00:' + timeValue
    } else {
        if (Math.trunc(timeValue / 60) > 9) { str = 'Time: ' + Math.trunc(timeValue / 60) + ':'}
            else { str = 'Time: 0' + Math.trunc(timeValue / 60) + ':'}
        if (timeValue % 60 > 9) { str += timeValue % 60 } 
            else { str += '0' + timeValue % 60}
    }
    return str
}

export {timeConvert}