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

        this.AddEventBtnSeeDetails(btnSeeDetails, btnGroup);
        this.AddEventBtnEdit(btnEdit);
        this.AddEventBtnDelete(btnDelete, card, this);

        return card;
    }

    AddEventBtnSeeDetails(btn, btnGroup) {

    }

    AddEventBtnEdit(btn) {

    }

    AddEventBtnDelete(btn, card) {

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