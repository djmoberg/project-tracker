export function calculateHours(from, to) {
    var fromS = from.split(":")
    var fromH = parseFloat(fromS[0])
    var fromM = parseFloat(fromS[1])
    fromM = (fromM * 60) / 3600

    var toS = to.split(":")
    var toH = parseFloat(toS[0])
    var toM = parseFloat(toS[1])
    toM = (toM * 60) / 3600

    return (toH + toM) - (fromH + fromM)
}

export function getHoursMinutes(time) {
    var timeS = time.split(":")
    var timeH = timeS[0]
    var timeM = timeS[1]
    return ({ timeH, timeM })
}

export function limitTo(string) {
    if (string.length > 10)
        return string.substring(0, 10) + "..."
    else
        return string
}

export function uniqueUserList(overview) {
    let users = []
    let list = []

    for (let i = 0; i < overview.length; i++) {
        if (!users.includes(overview[i].name)) {
            users.push(overview[i].name)
            list.push({ text: overview[i].name, value: overview[i].name })
        }
    }

    return list
}

export function getMonths() {
    return [
        { text: "Januar", value: "0" },
        { text: "Februar", value: "1" },
        { text: "Mars", value: "2" },
        { text: "April", value: "3" },
        { text: "Mai", value: "4" },
        { text: "Juni", value: "5" },
        { text: "Juli", value: "6" },
        { text: "August", value: "7" },
        { text: "September", value: "8" },
        { text: "Oktober", value: "9" },
        { text: "November", value: "10" },
        { text: "Desember", value: "11" }
    ]
    // {text: "Januar", value: "Januar"}, 
    // {text: "Februar", value: "Februar"}, 
    // {text: "Mars", value: "Mars"}, 
    // {text: "April", value: "April"}, 
    // {text: "Mai", value: "Mai"}, 
    // {text: "Juni", value: "Juni"}, 
    // {text: "Juli", value: "Juli"}, 
    // {text: "August", value: "August"}, 
    // {text: "September", value: "September"}, 
    // {text: "Oktober", value: "Oktober"}, 
    // {text: "November", value: "November"}, 
    // {text: "Desember", value: "Desember"}
}

export function uniqueYearList(overview) {
    let dates = []
    let list = []

    for (let i = 0; i < overview.length; i++) {
        let year = new Date(overview[i].workDate).getFullYear()
        if (!dates.includes(year)) {
            dates.push(year)
            list.push({ text: year, value: year })
        }
    }

    return list
}

export function hourOptions() {
    return [
        { text: "00", value: "00" },
        { text: "01", value: "01" },
        { text: "02", value: "02" },
        { text: "03", value: "03" },
        { text: "04", value: "04" },
        { text: "05", value: "05" },
        { text: "06", value: "06" },
        { text: "07", value: "07" },
        { text: "08", value: "08" },
        { text: "09", value: "09" },
        { text: "10", value: "10" },
        { text: "11", value: "11" },
        { text: "12", value: "12" },
        { text: "13", value: "13" },
        { text: "14", value: "14" },
        { text: "15", value: "15" },
        { text: "16", value: "16" },
        { text: "17", value: "17" },
        { text: "18", value: "18" },
        { text: "19", value: "19" },
        { text: "20", value: "20" },
        { text: "21", value: "21" },
        { text: "22", value: "22" },
        { text: "23", value: "23" },
    ]
}

export function minuteOptions() {
    return [
        { text: "00", value: "00" },
        { text: "15", value: "15" },
        { text: "30", value: "30" },
        { text: "45", value: "45" }
    ]
}

export function validDate(date) {
    return (date.length !== 0)
}

export function validFromTo(from, to) {
    return (calculateHours(from, to) > 0)
}

export function validComment(comment) {
    return (comment.length !== 0)
}

export function hourNow() {
    let h = new Date().getHours()
    if (h < 10)
        return "0" + h.toString()
    else
        return h.toString()
}

export function roundMinutes(m) {
    if (m <= 7)
        return "00"
    else if (m >= 8 && m <= 22)
        return "15"
    else if (m >= 23 && m <= 37)
        return "30"
    else if (m >= 38 && m <= 52)
        return "45"
    else
        return "00"
}

export function roundTime(time) {
    let t = new Date(time)
    let h = t.getHours()
    let m = t.getMinutes()

    if (m >= 53)
        h = h + 1

    if (h <= 9)
        h = "0" + h

    return h + ":" + roundMinutes(m)
}

export function formatDate(date) {
    let d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [year, month, day].join('-')
}

export function validPassword(pass) {
    return pass.length >= 3
}

export function validEmail(email) {
    return email.length >= 1 && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
}

export function getTotalHours(overview) {
    let totalHours = 0

    for (let i = 0; i < overview.length; i++) {
        totalHours += calculateHours(overview[i].workFrom, overview[i].workTo)
    }

    return totalHours
}