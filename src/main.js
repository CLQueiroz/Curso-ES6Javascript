// import api from './api';

// class App {
//     constructor() {
//         this.respositories = [];

//         this.formEl = document.getElementById('repo-form');
//         this.inputEl = document.querySelector('input[name=repository]');
//         this.listEl = document.getElementById('repo-list');

//         this.registerHandles();
//     }

//     registerHandles() {
//         this.formEl.onsubmit = event => this.addRespository(event);
//     }

//     async addRespository(event) {
//         event.preventDefault();

//         const repoInput = this.inputEl.value;

//         if (repoInput.length === 0) return;

//         const response = await api.get(`/repos/${repoInput}`);

//         console.log(response);

//         this.respositories.push({
//             name: 'rocketseat.com.br',
//             description: 'Tire a sua ideia do papel e de vida a sua startup',
//             avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?v=4',
//             html_url: 'http://github.com/clqueiroz'
//         });

//         this.render();
//     }
//     render() {
//         this.listEl.innerHTML = '';

//         this.respositories.forEach(repo => {
//             let imgEl = document.createElement('img');
//             imgEl.setAttribute('src', repo.avatar_url);

//             let titleEl = document.createElement('strong');
//             titleEl.appendChild(document.createTextNode(repo.name));

//             let descriptionEl = document.createElement('p');
//             descriptionEl.appendChild(document.createTextNode(repo.description));

//             let linkEl = document.createElement('a');
//             linkEl.setAttribute('target', '_blank')
//             linkEl.appendChild(document.createTextNode('Acessar'));

//             listItemEl = document.createElement('li');
//             listItemEl.appendChild(imgEl)
//             listItemEl.appendChild(titleEl)
//             listItemEl.appendChild(descriptionEl)
//             listItemEl.appendChild(linkEl)

//             this.listEl.appendChild(listItemEl);

//         })
//     }
// }

// new App();

import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;

        this.setLoading();

        try {
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();
        } catch (err) {
            alert('O repositório não existe!');
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();