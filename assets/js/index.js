
const MakeCards = async () => {
    let jobs = await GetJobs();
    setTimeout(() => {
        const loader = document.getElementById('loader-container');
        loader.classList.add('d-none')
        const jobsContainer = document.getElementById('jobs-container');
        jobs.forEach(job => {
            jobsContainer.appendChild(job.MakeCard());
        });
    }, 2000)
}

MakeCards();