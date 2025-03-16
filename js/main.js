// Default blogs that will always be available
const DEFAULT_BLOGS = [
    {
        id: 'default1',
        title: 'Welcome to Tech Blog',
        content: 'Welcome to our technology blog! Here you\'ll find the latest insights, tutorials, and discussions about software development, web technologies, and digital innovation. Our team of experts is dedicated to bringing you high-quality content that helps you stay ahead in the fast-paced world of technology.\n\nStay tuned for regular updates and feel free to explore our existing articles. Whether you\'re a beginner or an experienced developer, there\'s something here for everyone.',
        image: 'https://picsum.photos/800/400?random=welcome',
        date: new Date('2024-01-01').toISOString()
    },
    {
        id: 'default2',
        title: 'Getting Started with Web Development',
        content: 'Web development is an exciting field that combines creativity with technical skills. In this comprehensive guide, we\'ll explore the fundamental concepts and tools you need to begin your journey as a web developer.\n\nWe\'ll cover HTML, CSS, and JavaScript - the three core technologies that power the modern web. Whether you\'re looking to build simple websites or complex web applications, understanding these basics is essential.',
        image: 'https://picsum.photos/800/400?random=webdev',
        date: new Date('2024-01-15').toISOString()
    },
    {
        id: 'default3',
        title: 'The Future of AI in Technology',
        content: 'Artificial Intelligence is revolutionizing the way we interact with technology. From machine learning algorithms to neural networks, AI is becoming increasingly integrated into our daily lives.\n\nIn this article, we explore current AI trends, potential future developments, and how they might impact the technology landscape in the coming years. We\'ll also discuss practical applications of AI in web development and software engineering.',
        image: 'https://picsum.photos/800/400?random=ai',
        date: new Date('2024-02-01').toISOString()
    }
];

// Initialize blogs in localStorage
function initializeBlogs() {
    let blogs = localStorage.getItem('blogs');
    
    if (!blogs) {
        // If no blogs exist, set default blogs
        localStorage.setItem('blogs', JSON.stringify(DEFAULT_BLOGS));
    } else {
        // If blogs exist, ensure default blogs are included
        blogs = JSON.parse(blogs);
        let hasDefaults = DEFAULT_BLOGS.some(defaultBlog => 
            blogs.some(blog => blog.id === defaultBlog.id)
        );

        if (!hasDefaults) {
            // Add default blogs to existing blogs
            const mergedBlogs = [...DEFAULT_BLOGS, ...blogs];
            localStorage.setItem('blogs', JSON.stringify(mergedBlogs));
        }
    }
}

// Call initialization when the script loads
initializeBlogs();

// Admin credentials (in real world, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Function to load featured posts
function loadFeaturedPosts() {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    const featuredContainer = document.getElementById('featured-posts-container');
    
    if (!featuredContainer) return;

    // Sort blogs by date (newest first) and take the latest 3
    const featuredBlogs = [...blogs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    featuredContainer.innerHTML = featuredBlogs.map(blog => `
        <div class="post-card">
            <img src="${blog.image || 'https://picsum.photos/300x200'}" alt="${blog.title}">
            <div class="post-content">
                <h3>${blog.title}</h3>
                <p>${blog.content.substring(0, 150)}...</p>
                <a href="pages/blog.html?id=${blog.id}" class="read-more">Read More</a>
            </div>
        </div>
    `).join('');
}

// Function to generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to create new blog
function createBlog(title, content, image) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    const newBlog = {
        id: generateId(),
        title,
        content,
        image,
        date: new Date().toISOString(),
    };
    
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    return newBlog;
}

// Function to get blog by ID
function getBlogById(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    return blogs.find(blog => blog.id === id);
}

// Function to update blog
function updateBlog(id, title, content, image) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    const index = blogs.findIndex(blog => blog.id === id);
    
    if (index !== -1) {
        blogs[index] = {
            ...blogs[index],
            title,
            content,
            image,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('blogs', JSON.stringify(blogs));
        return blogs[index];
    }
    return null;
}

// Function to delete blog
function deleteBlog(id) {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    const filteredBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(filteredBlogs));
}

// Load featured posts on homepage
document.addEventListener('DOMContentLoaded', loadFeaturedPosts); 