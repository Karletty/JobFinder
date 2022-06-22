const frmCreateJob = document.getElementById('frm-create-job');
const inputs = ['name', 'description', 'location', 'seniority', 'category']
frmCreateJob.addEventListener('submit',(e) => {
    e.preventDefault();
    let validate = true;
    let job = new Job();
    inputs.forEach((input, i) => {
        if (e.target[input].value == '' && i <= 2) {
            validate = false;
        }
        job[input] = e.target[input].value
    });
    if (validate) {
        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(job)
        }
        fetch(`https://62ae56a6645d00a28a07201f.mockapi.io/Jobs`, options).then(()=>{
            window.location.pathname = '/index.html';
        });
    }
       
});