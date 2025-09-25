const container = document.querySelector('.content');
const searchInput = document.querySelector('.search');

// Static content for local development
const staticArticles = [
    {
        title: "Java Programming Guide",
        description: "Java is a highly popular, object-oriented programming language. This platform independent programming language is utilized for Android development, web development, artificial intelligence, cloud applications, and much more.",
        urlToImage: "../assets/images/java.png",
        url: "#"
    },
    {
        title: "C++ Development",
        description: "C++ is a high-level and object-oriented programming language. This language allows developers to write clean and efficient code for large applications and software development, game development, and operating system programming.",
        urlToImage: "../assets/images/c++.jpg",
        url: "#"
    },
    {
        title: "Python for Beginners",
        description: "Python is one of the most popular programming languages today, known for its simplicity and ease of use. Python is used in various fields like web development, data science, artificial intelligence, and automation.",
        urlToImage: "../assets/images/python.png",
        url: "#"
    },
    {
        title: "HTML Fundamentals",
        description: "HTML is a combination of Hypertext and Markup language. Hypertext defines the link between the web pages and Markup language defines the text document within the tag.",
        urlToImage: "../assets/images/html.png",
        url: "#"
    },
    {
        title: "MongoDB Database",
        description: "MongoDB is a document-oriented NoSQL database system that provides high scalability, flexibility, and performance. Unlike standard relational databases, MongoDB stores data in a JSON document structure form.",
        urlToImage: "../assets/images/mongodb.jpg",
        url: "#"
    },
    {
        title: "Flutter Development",
        description: "Flutter is a toolkit created by Google that lets developers build apps for mobile, web, and desktop using the same code. It uses the Dart programming language and comes with ready-to-use widgets for designing user interfaces.",
        urlToImage: "../assets/images/flutter.jpg",
        url: "#"
    },
    {
        title: "JavaScript Essentials",
        description: "JavaScript is a programming language used for creating dynamic content on websites. It is a lightweight, cross-platform and single-threaded programming language. JavaScript is an interpreted language that executes code line by line providing more flexibility.",
        urlToImage: "../assets/images/js.jpeg",
        url: "#"
    },
    {
        title: "MySQL Database",
        description: "MySQL is a popular open-source Relational Database Management System (RDBMS) that uses SQL (Structured Query Language) for database operations. While MySQL is a specific database system accessible for free and supports various programming languages.",
        urlToImage: "../assets/images/sql.jpg",
        url: "#"
    },
    {
        title: "Space & Time",
        description: "Space-Time, in physical science, single concept that recognizes the union of space and time, first proposed by the mathematician Hermann Minkowski in 1908 as a way to reformulate Albert Einstein's special theory of relativity (1905).",
        urlToImage: "../assets/images/example.jpg",
        url: "#"
    }
];

async function fetchNews(query = '') {
    try {
        // Try to use API first (for production)
        const apiUrl = query
            ? `/api/news?query=${encodeURIComponent(query)}&pageSize=9`
            : `/api/news?country=us&pageSize=9`;

        const response = await fetch(apiUrl);
        
        if (response.ok) {
            const data = await response.json();
            return data.articles || [];
        }
    } catch (error) {
        console.log("API not available, using static content");
    }
    
    // Fallback to static content
    if (query) {
        return staticArticles.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.description.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    return staticArticles;
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