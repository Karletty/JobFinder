const AddEventBtnSeeDetails = (btn, description, btnGroup, btnGoBack, job) => {
    btn.addEventListener('click', async () => {
        const cards = document.getElementsByClassName('card');
        let jobs = await GetJobs();
        let value = jobs.map(job => job.id);
        for (let i = 0; i < cards.length; i++) {
            if (i !== value.indexOf(job.id)) {
                cards[i].classList.add('d-none');
            }
            else {
                cards[i].classList.add('width-large')
            }
        }
        btnGoBack.classList.remove('d-none');
        description.classList.remove('text-overflow');
        btnGroup.classList.remove('d-none');
        btn.classList.add('d-none');

        btnGoBack.addEventListener('click', () => {
            window.location.reload();
        })
    })
}

const AddEventBtnEdit = (btn, job) => {
    btn.addEventListener('click', () => {
        const formContainer = document.getElementById('form-container');
        formContainer.classList.remove('d-none');
        const frmEdit = document.getElementById('frm-edit-job');
        let inputs = ['name', 'description', 'location', 'seniority', 'category']
        inputs.forEach(input => {
            document.getElementById(input).value = job[input]
        });
        frmEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            let validate = true;
            inputs.forEach((input, i) => {
                if (e.target[input].value == '' && i <= 2) {
                    validate = false;
                }
                job[input] = e.target[input].value
            });
            if (validate) {
                const options = {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(job)
                }
                fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs/${job.id}`, options).then(() => {
                    window.location.reload();
                });

            }
        })
    });
}

const AddEventBtnDelete = (btn, card, job) => {
    btn.addEventListener('click', () => {
        const alert = document.getElementById('alert-delete');
        const btnDelete = document.getElementById('confirm-delete');
        const btnCancel = document.getElementById('cancel-delete');
        alert.classList.remove('d-none');
        card.classList.add('d-none');
        btnDelete.addEventListener('click', () => {
            fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs/${job.id}`, {
                method: 'DELETE'
            }).then(() => { window.location.reload(); });
        });
        btnCancel.addEventListener('click', () => {
            window.location.reload();
        });
    });
}

class Job {
    constructor(id, name, description, location, category, seniority) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.category = category;
        this.seniority = seniority;
    }

    SetAttributes(element) {
        this.id = element.id;
        this.name = element.name;
        this.description = element.description;
        this.location = element.location;
        this.category = element.category;
        this.seniority = element.seniority;
    }

    MakeCard() {
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const btnGoBack = document.createElement('button');
        const description = document.createElement('p');
        const tags = document.createElement('div');
        const btnSeeDetails = document.createElement('button');
        const btnGroup = document.createElement('div');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        [this.location, this.category, this.seniority].forEach((element) => {
            if (element !== '') {
                const small = document.createElement('small');
                small.setAttribute('class', 'bg-info rounded-2 px-2 py-1')
                small.appendChild(document.createTextNode(element));
                tags.appendChild(small);
            }
        });

        card.setAttribute('class', 'card m-3');
        cardBody.setAttribute('class', 'card-body');
        title.setAttribute('class', 'card-title');
        btnGoBack.setAttribute('class', 'btn btn-go-back d-none');
        description.setAttribute('class', 'card-text text-overflow');
        btnSeeDetails.setAttribute('class', 'btn btn-outline-info btn-see-details');
        btnGroup.setAttribute('class', 'd-none');
        btnEdit.setAttribute('class', 'btn btn-success m-right-10');
        btnDelete.setAttribute('class', 'btn btn-danger');
        tags.setAttribute('class', 'd-flex flex-wrap')

        title.appendChild(btnGoBack);

        description.appendChild(document.createTextNode(this.description));
        title.appendChild(document.createTextNode(this.name));
        btnSeeDetails.appendChild(document.createTextNode('See Details'));
        btnEdit.appendChild(document.createTextNode('Edit'));
        btnDelete.appendChild(document.createTextNode('Delete'));

        btnGroup.appendChild(btnEdit);
        btnGroup.appendChild(btnDelete);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(tags)
        cardBody.appendChild(btnSeeDetails);
        cardBody.appendChild(btnGroup);
        card.appendChild(cardBody);

        AddEventBtnSeeDetails(btnSeeDetails, description, btnGroup, btnGoBack, this);
        AddEventBtnEdit(btnEdit, this);
        AddEventBtnDelete(btnDelete, card, this);

        return card;
    }
}

const GetJobs = async () => {
    let jobs = [];
    const promise = fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs`).then(response => response.json()).then(data => {
        data.forEach((element) => {
            let job = new Job();
            job.SetAttributes(element);
            element = job;
            jobs.push(job)
        });
        return jobs;
    });
    return await promise;
}