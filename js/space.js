const container = document.querySelector('.content');
const searchInput = document.querySelector('.search');

async function fetchNews(query = '') {
    try {
        const apiUrl = query
            ? `/api/news?query=${encodeURIComponent(query)}&pageSize=9`
            : `/api/news?country=us&pageSize=9`;

        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    container.innerHTML = ""; // Clear previous content

    articles.forEach((article) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        const img = document.createElement("img");
        img.src = article.urlToImage || 'mongodb.jpg';
        img.alt = article.title || "No title available";
        img.style.maxHeight = "30vh";
        imageDiv.appendChild(img);

        const headingDiv = document.createElement("div");
        headingDiv.classList.add("heading");
        const title = document.createElement("h3");
        title.textContent = article.title?.length > 30 ? article.title.slice(0, 30) + "..." : article.title || "No title available";
        headingDiv.appendChild(title);

        const notesDiv = document.createElement("div");
        notesDiv.classList.add("mini_notes");
        const description = document.createElement("p");
        description.textContent = article.description?.length > 100 ? article.description.slice(0, 100) + "..." : article.description || "No description available";
        notesDiv.appendChild(description);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button");
        const button = document.createElement("button");
        button.textContent = "Read more";

        button.addEventListener("click", () => {
            window.open(article.url,"_blank");
        });

        buttonDiv.appendChild(button);
        card.appendChild(imageDiv);
        card.appendChild(headingDiv);
        card.appendChild(notesDiv);
        card.appendChild(buttonDiv);
        container.appendChild(card);
    });
}

searchInput.addEventListener("keypress", async (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        const articles = await fetchNews(query);
        displayBlogs(articles);
    }
});

// Fetch default articles on page load
(async () => {
    try {
        const articles = await fetchNews(); // Fetch without query for default content
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs:", error);
    }
})();