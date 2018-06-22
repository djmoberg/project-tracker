const request = require('superagent');

export function deleteWork(id, callback) {
    request.delete(process.env.REACT_APP_BACKEND + "work/delete")
        .send({ id })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function editWork(work, callback) {
    request.put(process.env.REACT_APP_BACKEND + "work/edit")
        .send({ work })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}