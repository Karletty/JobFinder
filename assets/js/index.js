const params = new URLSearchParams(location.search);

const Filter = jobs => {
    ['location', 'seniority', 'category'].forEach(paramName => {
        if (params.get(paramName)) {
            jobs = jobs.filter(job => job[paramName] === params.get(paramName));
        }
    });
    return jobs
}

const MakeCards = async () => {
    let jobs = await GetJobs();
    jobs = Filter(jobs);
    setTimeout(() => {
        const loader = document.getElementById('loader-container');
        loader.classList.add('d-none')
        const jobsContainer = document.getElementById('jobs-container');
        jobs.forEach(job => {
            jobsContainer.appendChild(job.MakeCard());
        });
    }, 2000)
}

const RemoveRepetition = (array) => {
    return array.filter((e, i) => {
        if (e) {
            return array.indexOf(e) === i;
        }
    });
}

const PutSelect = (id, array) => {
    const select = document.getElementById(id);
    array.forEach(element => {
        const op = document.createElement('option');
        op.setAttribute('value', element);
        op.appendChild(document.createTextNode(element));
        select.appendChild(op);
    });
}


const PutFilters = async () => {
    const jobs = await GetJobs();
    let locations = RemoveRepetition(jobs.map(job => job.location));
    let seniorities = RemoveRepetition(jobs.map(job => job.seniority));
    let categories = RemoveRepetition(jobs.map(job => job.category))
    locations.unshift('Location');
    seniorities.unshift('Seniority');
    categories.unshift('Category');
    PutSelect('filter-location', locations);
    PutSelect('filter-seniority', seniorities);
    PutSelect('filter-category', categories);

    SetFilters();
}

const SetFilters = () => {
    ['location', 'seniority', 'category'].forEach(paramName => {
        if (params.get(paramName)) {
            document.getElementById(`filter-${paramName}`).value = params.get(paramName)
        }
    })
}

document.getElementById('btn-clear-filters').addEventListener('click', () => {
    window.location.href = window.location.pathname;
});

document.getElementById('frm-filter').addEventListener('submit', (e) => {
    e.preventDefault();
    ['location', 'seniority', 'category'].forEach(select => {
        let value = e.target[select].value;
        if (value !== (select.charAt(0).toUpperCase() + select.slice(1))) {
            params.set(select, value);
        }
        else {
            params.delete(select)
        }
    });
    window.location.href = `${window.location.pathname}?${params.toString()}`;
})

MakeCards();
PutFilters();