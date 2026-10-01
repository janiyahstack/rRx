const searchBar = document.getElementById("searchBar");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", async () => {
        const searchQuery = searchBar.value;
        console.log (searchBar.value);
        const response = await fetch("https://rrx-p6c0.onrender.com/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: searchQuery
            })
        });
        const data = await response.json();
        console.log(data)
        const results = data.results;
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = data.results.map(item => `
            <div class ="result-card">
            ${item.answer.split(/\d+\.\s+/).filter(Boolean).map(result => `<p>${result}</p>`).join("")}
            </div>`).join();
        

    });