// ============================================
// RECIPE DATA
// ============================================

const recipes = [
    {
        id: 1,
        title: 'Classic Spaghetti Carbonara',
        description: 'Creamy Italian pasta with eggs, cheese, and pancetta',
        difficulty: 'easy',
        time: 20,
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta', 'Black Pepper'],
        image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Spicy Thai Curry',
        description: 'Aromatic and spicy Thai curry with coconut milk and vegetables',
        difficulty: 'medium',
        time: 35,
        ingredients: ['Curry Paste', 'Coconut Milk', 'Vegetables', 'Lime Juice', 'Basil'],
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e2a?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a molten center',
        difficulty: 'hard',
        time: 25,
        ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Sugar'],
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Quick Caesar Salad',
        description: 'Fresh crisp salad with homemade Caesar dressing',
        difficulty: 'easy',
        time: 10,
        ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing', 'Lemon'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        title: 'Beef Wellington',
        description: 'Premium beef tenderloin wrapped in pastry and mushroom duxelles',
        difficulty: 'hard',
        time: 90,
        ingredients: ['Beef Tenderloin', 'Puff Pastry', 'Mushrooms', 'Prosciutto', 'Shallots'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        title: 'Creamy Tomato Soup',
        description: 'Smooth and creamy tomato soup with fresh basil',
        difficulty: 'easy',
        time: 28,
        ingredients: ['Tomatoes', 'Cream', 'Onion', 'Garlic', 'Basil'],
        image: 'https://images.unsplash.com/photo-1547592166-7781c7417205?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        title: 'Sushi Rolls',
        description: 'Delicate sushi rolls with fresh fish and vegetables',
        difficulty: 'hard',
        time: 40,
        ingredients: ['Sushi Rice', 'Nori', 'Fresh Fish', 'Cucumber', 'Avocado'],
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        title: 'Mediterranean Chickpea Bowl',
        description: 'Healthy and colorful bowl with roasted chickpeas and veggies',
        difficulty: 'medium',
        time: 30,
        ingredients: ['Chickpeas', 'Bell Peppers', 'Cucumber', 'Feta Cheese', 'Olive Oil'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let currentFilter = 'all';
let currentSort = 'none';

// ============================================
// DOM REFERENCES
// ============================================

const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');

// ============================================
// PURE FILTER FUNCTIONS
// ============================================

/**
 * Filter recipes by difficulty level
 * @param {Array} recipes - Array of recipe objects
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array} New array with filtered recipes
 */
const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

/**
 * Filter recipes by maximum cooking time
 * @param {Array} recipes - Array of recipe objects
 * @param {number} maxTime - Maximum time in minutes
 * @returns {Array} New array with recipes under max time
 */
const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time <= maxTime);
};

/**
 * Apply the current filter to recipes
 * @param {Array} recipes - Array of recipe objects
 * @param {string} filterType - Type of filter to apply
 * @returns {Array} Filtered array
 */
const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case 'easy':
            return filterByDifficulty(recipes, 'easy');
        case 'medium':
            return filterByDifficulty(recipes, 'medium');
        case 'hard':
            return filterByDifficulty(recipes, 'hard');
        case 'quick':
            return filterByTime(recipes, 30);
        case 'all':
        default:
            return recipes;
    }
};

// ============================================
// PURE SORT FUNCTIONS
// ============================================

/**
 * Sort recipes by name (A-Z)
 * Uses spread operator to avoid mutating original array
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} New sorted array
 */
const sortByName = (recipes) => {
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Sort recipes by cooking time (fastest first)
 * Uses spread operator to avoid mutating original array
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} New sorted array
 */
const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) => a.time - b.time);
};

/**
 * Apply the current sort to recipes
 * @param {Array} recipes - Array of recipe objects
 * @param {string} sortType - Type of sort to apply
 * @returns {Array} Sorted array
 */
const applySort = (recipes, sortType) => {
    switch (sortType) {
        case 'name':
            return sortByName(recipes);
        case 'time':
            return sortByTime(recipes);
        case 'none':
        default:
            return recipes;
    }
};

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Create HTML for a single recipe card
 * @param {Object} recipe - Recipe object
 * @returns {string} HTML string for recipe card
 */
const createRecipeCard = (recipe) => {
    const difficultyClass = `difficulty-${recipe.difficulty}`;
    
    return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-content">
                <h2>${recipe.title}</h2>
                <p>${recipe.description}</p>
                
                <div class="recipe-meta">
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label">Time</span>
                        <span class="recipe-meta-value">${recipe.time} min</span>
                    </div>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label">Difficulty</span>
                        <span class="difficulty-badge ${difficultyClass}">
                            ${recipe.difficulty}
                        </span>
                    </div>
                </div>
                
                <div class="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
};

/**
 * Render recipes to the DOM
 * @param {Array} recipesToRender - Array of recipe objects to display
 */
const renderRecipes = (recipesToRender) => {
    if (recipesToRender.length === 0) {
        recipeContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; padding: 2rem;">No recipes found. Try a different filter!</p>';
        return;
    }
    
    recipeContainer.innerHTML = recipesToRender
        .map(recipe => createRecipeCard(recipe))
        .join('');
};

// ============================================
// MAIN UPDATE FUNCTION
// ============================================

/**
 * Main orchestration function that applies filter, sort, and renders
 * This demonstrates the composition of pure functions
 */
const updateDisplay = () => {
    // Start with all recipes
    let recipesToDisplay = recipes;
    
    // Apply current filter
    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    
    // Apply current sort
    recipesToDisplay = applySort(recipesToDisplay, currentSort);
    
    // Render the result
    renderRecipes(recipesToDisplay);
    
    // Debug logging
    console.log(`📊 Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
};

// ============================================
// UI HELPER FUNCTIONS
// ============================================

/**
 * Update active button states based on current filter/sort
 * Adds/removes .active class from buttons
 */
const updateActiveButtons = () => {
    // Update filter buttons
    filterButtons.forEach(btn => {
        const filterType = btn.dataset.filter;
        if (filterType === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update sort buttons
    sortButtons.forEach(btn => {
        const sortType = btn.dataset.sort;
        if (sortType === currentSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle filter button clicks
 * @param {Event} event - Click event object
 */
const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    
    currentFilter = filterType;
    
    updateActiveButtons();
    updateDisplay();
    
    console.log(`🔍 Filter changed to: ${filterType}`);
};

/**
 * Handle sort button clicks
 * @param {Event} event - Click event object
 */
const handleSortClick = (event) => {
    const sortType = event.target.dataset.sort;
    
    currentSort = sortType;
    
    updateActiveButtons();
    updateDisplay();
    
    console.log(`↕️ Sort changed to: ${sortType}`);
};

// ============================================
// EVENT LISTENER SETUP
// ============================================

/**
 * Initialize all event listeners
 * Uses forEach to attach handlers to all filter and sort buttons
 */
const setupEventListeners = () => {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSortClick);
    });
    
    console.log('✅ Event listeners attached!');
};

// ============================================
// INITIALIZATION
// ============================================

// Set up event listeners on page load
setupEventListeners();

// Initial render with default filter/sort
updateDisplay();

console.log('🍳 Recipe App initialized!');
console.log('📚 Functional Programming Concepts Used:');
console.log('   ✓ Pure Functions (filterByDifficulty, sortByName, etc.)');
console.log('   ✓ Higher-Order Functions (filter(), sort(), map(), forEach())');
console.log('   ✓ First-Class Functions (functions passed as event handlers)');
console.log('   ✓ Function Composition (updateDisplay combines multiple functions)');
