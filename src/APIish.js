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
            password: data.password,
            email: data.email
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
export function registerProject(name, description, callback) {
    request.post(process.env.REACT_APP_BACKEND + "project/register")
        .send({ name: name, description: description })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//JoinProject.js
export function searchProject(value, callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "projects/find/" + value)
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function sendJoinRequest(projectId, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "projects/joinRequest")
        .send({ projectId: projectId })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function getPendingJoinRequests(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "user/pendingJoinRequests")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function deletePendingJoinRequests(projectId, callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "user/pendingJoinRequest")
        .send({ projectId: projectId })
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

export function makeAdmin(username, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "project/makeAdmin")
        .send({ username: username })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function deleteProject(callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "project")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function getJoinRequests(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "project/joinRequests")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function deleteJoinRequest(userId, callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "project/joinRequests")
        .send({ userId: userId })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function updateProject(newName, newDescription, callback) {
    request
        .put(process.env.REACT_APP_BACKEND + "project")
        .send({ newName: newName, newDescription: newDescription })
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

export function trashWork(work, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "work/trash")
        .send({
            id: work.id,
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
            comment: work.comment,
            addedUsers: work.addedUsers
        })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function getAllUsers(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "project/allUsers")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//WorkTimer.js
export function getTimer(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "workTimer")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function setTimer(startTime, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "workTimer/new")
        .send({ startTime: startTime })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function deleteTimer(callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "workTimer")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//Settings.js
export function newPassword(password, callback) {
    request
        .put(process.env.REACT_APP_BACKEND + "user/newPassword")
        .send({ newPassword: password })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function getDeletedWork(callback) {
    request
        .get(process.env.REACT_APP_BACKEND + "work/deleted")
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

export function deleteTrash(id, callback) {
    request
        .delete(process.env.REACT_APP_BACKEND + "work/trash")
        .send({ id: id })
        .withCredentials()
        .then((res) => {
            callback(res)
        })
}

//ForgotPassword.js
export function sendNewPassword(email, callback) {
    request
        .post(process.env.REACT_APP_BACKEND + "user/sendNewPassword")
        .send({ email: email })
        .then((res) => {
            callback(res)
        })
}