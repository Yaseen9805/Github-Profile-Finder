let profileCard = document.getElementById("profileCard")
let username = document.getElementById("username")
let searchBtn = document.getElementById("searchBtn")
let error = document.getElementById("error")
let loading = document.getElementById("loading")

let github = JSON.parse(localStorage.getItem("github")) || []

function datafetch() {
    let val = username.value
    if (!val) return

    let dataobj = {} // ✅ moved inside

    loading.style.display = "block"
    profileCard.classList.add("none")
    error.style.display = "none"

    fetch(`https://api.github.com/users/${val}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("User not found")
            }
            return response.json()
        })
        .then((data) => {
            // ✅ user data
            dataobj.img = data.avatar_url
            dataobj.name = data.name
            dataobj.bio = data.bio
            dataobj.repositories = data.public_repos
            dataobj.followers = data.followers
            dataobj.following = data.following

            dataobj.reposList = [] // ✅ important

            // ✅ fetch repos (CHAINED)
            return fetch(`https://api.github.com/users/${val}/repos?per_page=5&sort=updated`)
        })
        .then((res) => res.json())
        .then((repos) => {
            // ✅ store repos
            repos.forEach((repo) => {
                dataobj.reposList.push({
                    repo_name: repo.name,
                    url: repo.html_url,
                    stars: repo.stargazers_count
                })
            })

            // ✅ now everything ready
            github.push(dataobj)
            localStorage.setItem("github", JSON.stringify(github))

            loading.style.display = "none"
            profileCard.classList.remove("none")

            renderData()
        })
        .catch((err) => {
            loading.style.display = "none"
            profileCard.classList.add("none")
            error.style.display = "block"
        })
}

function renderData() {
    profileCard.innerHTML = ""

    github.forEach((val) => {

        let reposHTML = ""

        val.reposList?.forEach((repo) => {
            reposHTML += `
  <a href="${repo.url}" target="_blank">
    ${repo.repo_name}
    <span>⭐ ${repo.stars}</span>
  </a>
`
        })

        profileCard.innerHTML += `
        <div class="card">
            <img class="avatar" src="${val.img}" alt="avatar" />
            <div class="profile-info">
                <h2 class="name">${val.name}</h2>
                <p class="bio">${val.bio}</p>

                <div class="stats">
                    <div>Repos: <span class="repos">${val.repositories}</span></div>
                    <div>Followers: <span class="followers">${val.followers}</span></div>
                    <div>Following: <span class="following">${val.following}</span></div>
                </div>

                <div class="repo-list">
                    ${reposHTML}
                </div>
            </div>
        </div>
        `
    })
}

searchBtn.addEventListener("click", datafetch)

// optional: render stored users on load
renderData()

// initial state
loading.style.display = "none"