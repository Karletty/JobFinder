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