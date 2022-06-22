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

        card.setAttribute('class', 'card m-3 mx-width-18');
        cardBody.setAttribute('class', 'card-body');
        title.setAttribute('class', 'card-title')
        description.setAttribute('class', 'card-text text-overflow');
        btnSeeDetails.setAttribute('class', 'btn btn-outline-info btn-see-details');
        btnGroup.setAttribute('class', 'd-none');
        btnEdit.setAttribute('class', 'btn btn-success m-right-10');
        btnDelete.setAttribute('class', 'btn btn-danger');
        tags.setAttribute('class', 'd-flex flex-wrap')

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

        this.AddEventBtnSeeDetails(btnSeeDetails, description, btnGroup);
        this.AddEventBtnEdit(btnEdit);
        this.AddEventBtnDelete(btnDelete, card, this);

        return card;
    }

    AddEventBtnSeeDetails(btn, description, btnGroup) {
        btn.addEventListener('click', async () => {
            const cards = document.getElementsByClassName('card');
            let jobs = await GetJobs();
            let value = jobs.map(job => job.id);
            for (let i = 0; i < cards.length; i++) {
                if (i !== value.indexOf(this.id)) {
                    cards[i].classList.add('d-none');
                }
                else {
                    cards[i].classList.add('min-width-500')
                }
            }
            description.classList.remove('text-overflow');
            btnGroup.classList.remove('d-none');
            btn.classList.add('d-none');
        })
    }

    AddEventBtnEdit(btn) {
        btn.addEventListener('click', () => {
            const formContainer = document.getElementById('form-container');
            formContainer.classList.remove('d-none');
            const frmEdit = document.getElementById('frm-edit-job');
            let inputs = ['name', 'description', 'location', 'seniority', 'category']
            inputs.forEach(input => {
                document.getElementById(input).value = this[input]
            });
            frmEdit.addEventListener('submit', (e) => {
                e.preventDefault();
                let validate = true;
                inputs.forEach((input, i) => {
                    if (e.target[input].value == '' && i <= 2) {
                        validate = false;
                    }
                    this[input] = e.target[input].value
                });
                if (validate) {
                    const options = {
                        method: 'PUT',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(this)
                    }
                    fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs/${this.id}`, options).then(() => {
                        window.location.reload();
                    });

                }
            })
        });
    }

    AddEventBtnDelete(btn, card) {
        btn.addEventListener('click', () => {
            const alert = document.getElementById('alert-delete');
            const btnDelete = document.getElementById('confirm-delete');
            const btnCancel = document.getElementById('cancel-delete');
            alert.classList.remove('d-none');
            card.classList.add('d-none');
            btnDelete.addEventListener('click', () => {
                fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs/${this.id}`, {
                    method: 'DELETE'
                }).then(() => { window.location.reload(); });
            });
            btnCancel.addEventListener('click', () => {
                window.location.reload();
            });
        });
    }
}

const GetJobs = async () => {
    let jobs = [];
    const promise = fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs`).then(response => response.json()).then(data => {
        data.forEach((element) => {
            let job = new Job();
            job.SetAttributes(element);
            elemen = job;
            jobs.push(job)
        });
        return jobs;
    });
    return await promise;
}