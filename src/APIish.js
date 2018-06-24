const request = require('superagent');

//App.js
export function isLoggedIn(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "authenticate/loggedIn")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function logOut(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "authenticate/logout")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//Login.js
export function login(data, errCallback, thenCallback) {
    request.post(process.env.REACT_APP_BACKEND + "authenticate/login")
        .send({
            username: data.username,
            password: data.password
        })
        .withCredentials()
        .on('error', (err) => {
            errCallback(err)
        })
        .then((res) => {
            thenCallback(res)
        })
}

//RegisterUser.js
export function registerUser(data, callback) {
    request.post(process.env.REACT_APP_BACKEND + "user/register")
        .send({
            username: data.username,
            password: data.password
        })
        .then((res) => {
            callback(res)
        })
}

export function isUsernameValid(username, callback) {
    request.get(process.env.REACT_APP_BACKEND + "user/exists/" + username)
    .then((res) => {
        callback(res)
    })
}

//ProjectExplorer.js
export function getProject(projectId, callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "project/" + projectId)
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//RegisterProject.js
export function registerProject(name, callback) {
    request.post(process.env.REACT_APP_BACKEND + "project/register")
        .send({ name: name })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//ChooseProject.js
export function getProjects(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "projects")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//Admin.js
export function getUsers(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "project/users")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function searchUser(value, callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "users/find/" + value)
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function addUser(username, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "project/addUser")
        .send({ username: username })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function removeUser(username, callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "project/removeUser")
        .send({ username: username })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//UserOverview.js
export function deleteWork(id, callback) {
    request.delete(process.env.REACT_APP_BACKEND + "work/delete")
        .send({ id })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//Add.js
export function editWork(work, callback) {
    request.put(process.env.REACT_APP_BACKEND + "work/edit")
        .send({
            workDate: work.workDate,
            workFrom: work.workFrom,
            workTo: work.workTo,
            comment: work.comment,
            id: work.id
        })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function addWork(work, callback) {
    request.post(process.env.REACT_APP_BACKEND + "work/add")
        .send({
            workDate: work.workDate,
            workFrom: work.workFrom,
            workTo: work.workTo,
            comment: work.comment
        })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}