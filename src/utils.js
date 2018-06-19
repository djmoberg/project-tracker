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
            list.push({text: overview[i].name, value: overview[i].name}) 
        }
    }

    return list
}

export function getMonths() {
    return [
        {text: "Januar", value: "0"}, 
        {text: "Februar", value: "1"}, 
        {text: "Mars", value: "2"}, 
        {text: "April", value: "3"}, 
        {text: "Mai", value: "4"}, 
        {text: "Juni", value: "5"}, 
        {text: "Juli", value: "6"}, 
        {text: "August", value: "7"}, 
        {text: "September", value: "8"}, 
        {text: "Oktober", value: "9"}, 
        {text: "November", value: "10"}, 
        {text: "Desember", value: "11"}
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
            list.push({text: year, value: year}) 
        }
    }

    return list
}

export function hourOptions() {
    return [
        {text: "00", value: "00"},
        {text: "01", value: "01"},
        {text: "02", value: "02"},
        {text: "03", value: "03"},
        {text: "04", value: "04"},
        {text: "05", value: "05"},
        {text: "06", value: "06"},
        {text: "07", value: "07"},
        {text: "08", value: "08"},
        {text: "09", value: "09"},
        {text: "10", value: "10"},
        {text: "11", value: "11"},
        {text: "12", value: "12"},
        {text: "13", value: "13"},
        {text: "14", value: "14"},
        {text: "15", value: "15"},
        {text: "16", value: "16"},
        {text: "17", value: "17"},
        {text: "18", value: "18"},
        {text: "19", value: "19"},
        {text: "20", value: "20"},
        {text: "21", value: "21"},
        {text: "22", value: "22"},
        {text: "23", value: "23"},
    ]
}

export function minuteOptions() {
    return [
        {text: "00", value: "00"},
        {text: "15", value: "15"},
        {text: "30", value: "30"},
        {text: "45", value: "45"}
    ]
}