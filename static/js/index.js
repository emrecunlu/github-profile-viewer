function loading () {
    document.querySelector('.loading').classList.add('active');
}

function stopLoading () {
    document.querySelector('.loading').classList.remove('active');
}


let searchBar = document.querySelector('.search'),
    name = document.querySelector('.name a'),
    avatar = document.querySelector('.avatar img'),
    followers = document.querySelector('.followers span'),
    following = document.querySelector('.following span'),
    totalRepos = document.querySelector('li.repos span'),
    repoNames = document.querySelector('div.repos');

searchBar.addEventListener('keypress', async (e) => {

    let userName = e.target.value.trim();

    if (userName.length >= 3 && e.keyCode === 13) {

        loading();

        const profile = await fetch (`https://api.github.com/users/${userName}`).then(res => res.json());
        const repos = await fetch (`https://api.github.com/users/${userName}/repos`).then(res => res.json());

        await stopLoading();

        if ( profile?.message === 'Not Found') {
            alert ('User Not Found!');
        } else {

            repoNames.innerHTML = '';

            avatar.setAttribute('src', profile.avatar_url);
            name.innerHTML = profile.name;
            name.setAttribute('href', profile.html_url);
            followers.innerHTML = profile.followers;
            following.innerHTML = profile.following;
            totalRepos.innerHTML = profile.public_repos;

            repos.forEach( repo => {
                repoNames.innerHTML += `
                    <div class="repo">${repo.name}</div>
                `
            });

            searchBar.value = '';

        }
    }
});