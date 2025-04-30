// Default blogs that will always be available
const DEFAULT_BLOGS = [
    {
        id: 'default-1',
        title: 'Lorem Ipsum Dolor Sit Amet',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        date: '2024-03-15'
    },
    {
        id: 'default-2',
        title: 'Consectetur Adipiscing Elit',
        content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`,
        date: '2024-03-14'
    },
    {
        id: 'default-3',
        title: 'Nemo Enim Ipsam Voluptatem',
        content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,
        date: '2024-03-13'
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