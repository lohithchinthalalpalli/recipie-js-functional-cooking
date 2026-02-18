// ============================================
// RECIPE APP - IIFE MODULE PATTERN
// ============================================
// Wrap entire app in IIFE for encapsulation
// Private: recipes, state, helper functions
// Public: init, updateDisplay
// ============================================

const RecipeApp = (() => {
    
    // ============================================
    // PRIVATE: RECIPE DATA
    // ============================================
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: [
                "400g spaghetti",
                "200g pancetta or guanciale",
                "4 large eggs",
                "100g Pecorino Romano cheese",
                "Black pepper",
                "Salt"
            ],
            steps: [
                "Bring a large pot of salted water to boil",
                "Cook spaghetti according to package directions",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Beat eggs in a bowl",
                        "Grate cheese and add to eggs",
                        "Add generous black pepper",
                        "Mix well"
                    ]
                },
                "Cook pancetta in a large pan until crispy",
                "Drain pasta, reserve 1 cup pasta water",
                "Add hot pasta to pancetta pan (off heat)",
                "Quickly mix in egg mixture, adding pasta water to create creamy sauce",
                "Serve immediately with extra cheese"
            ]
        },
        {
            id: 2,
            title: "Margherita Pizza",
            time: 30,
            difficulty: "easy",
            description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil.",
            category: "pizza",
            ingredients: [
                "500g pizza dough",
                "200g San Marzano tomatoes",
                "250g fresh mozzarella",
                "Fresh basil leaves",
                "Olive oil",
                "Salt"
            ],
            steps: [
                "Preheat oven to 250°C (480°F)",
                "Stretch pizza dough to desired thickness",
                "Spread tomato sauce evenly on dough",
                "Tear mozzarella into pieces and distribute",
                "Drizzle with olive oil",
                "Bake for 10-12 minutes until crust is golden",
                "Remove from oven and tear fresh basil on top",
                "Sprinkle salt and serve hot"
            ]
        },
        {
            id: 3,
            title: "Thai Green Curry",
            time: 40,
            difficulty: "medium",
            description: "Aromatic Thai curry with coconut milk, chicken, and fresh vegetables.",
            category: "curry",
            ingredients: [
                "500g chicken breast",
                "400ml coconut milk",
                "200g Thai green curry paste",
                "2 bell peppers",
                "150g green beans",
                "3 tbsp fish sauce",
                "2 tbsp lime juice",
                "Fresh basil leaves"
            ],
            steps: [
                {
                    text: "Prepare ingredients",
                    substeps: [
                        "Cut chicken into bite-sized pieces",
                        "Slice bell peppers into chunks",
                        "Trim and cut green beans",
                        "Gather fresh basil"
                    ]
                },
                "Heat oil in large pan over medium-high heat",
                "Add curry paste and stir-fry for 1-2 minutes",
                "Pour in coconut milk slowly, stirring constantly",
                "Add chicken pieces and cook for 10 minutes",
                {
                    text: "Add vegetables and season",
                    substeps: [
                        "Add bell peppers and green beans",
                        "Simmer for 8 minutes until vegetables are tender",
                        "Add fish sauce and lime juice",
                        "Taste and adjust seasoning"
                    ]
                },
                "Top with fresh basil",
                "Serve hot with jasmine rice"
            ]
        },
        {
            id: 4,
            title: "Chocolate Lava Cake",
            time: 20,
            difficulty: "medium",
            description: "Decadent chocolate cake with a molten center and crispy outer shell.",
            category: "dessert",
            ingredients: [
                "200g dark chocolate",
                "100g butter",
                "2 large eggs",
                "2 egg yolks",
                "50g sugar",
                "30g flour",
                "1 tsp vanilla extract",
                "Pinch of salt",
                "Butter and cocoa powder for ramekins"
            ],
            steps: [
                "Preheat oven to 200°C (400°F)",
                "Butter and dust 2 ramekins with cocoa powder",
                {
                    text: "Prepare chocolate mixture",
                    substeps: [
                        "Chop chocolate into small pieces",
                        "Melt chocolate with butter over double boiler",
                        "Stir until smooth",
                        "Let cool slightly"
                    ]
                },
                {
                    text: "Make batter",
                    substeps: [
                        "Whisk eggs and yolks with sugar until pale",
                        "Gently fold chocolate mixture into eggs",
                        {
                            text: "Add final ingredients",
                            substeps: [
                                "Sift flour into mixture",
                                "Add vanilla extract",
                                "Fold gently until combined",
                                "Season with salt"
                            ]
                        },
                        "Divide between ramekins"
                    ]
                },
                "Bake for 12-14 minutes until edges are firm but center is soft",
                "Turn out onto serving plates immediately",
                "Serve with vanilla ice cream or whipped cream"
            ]
        },
        {
            id: 5,
            title: "Grilled Salmon with Lemon",
            time: 25,
            difficulty: "easy",
            description: "Fresh salmon fillet grilled to perfection with herbs and citrus.",
            category: "seafood",
            ingredients: [
                "2 salmon fillets (200g each)",
                "2 lemons",
                "Fresh dill",
                "Fresh thyme",
                "Olive oil",
                "Sea salt",
                "Black pepper",
                "Garlic cloves"
            ],
            steps: [
                "Preheat grill or grill pan to high heat",
                "Pat salmon fillets dry with paper towels",
                "Brush both sides with olive oil",
                "Season generously with salt and pepper",
                "Place on hot grill, skin-side down",
                "Grill for 4-5 minutes without moving",
                "Flip and grill for another 3-4 minutes",
                "Garnish with fresh dill and thyme",
                "Serve with lemon wedges and roasted vegetables"
            ]
        },
        {
            id: 6,
            title: "Beef Bourguignon",
            time: 180,
            difficulty: "hard",
            description: "Classic French beef stew cooked in red wine with root vegetables.",
            category: "beef",
            ingredients: [
                "1.5kg beef chuck, cubed",
                "750ml red wine",
                "500ml beef broth",
                "300g pearl onions",
                "250g mushrooms",
                "200g carrots",
                "6 cloves garlic",
                "2 tbsp tomato paste",
                "Bouquet garni"
            ],
            steps: [
                {
                    text: "Prepare ingredients",
                    substeps: [
                        "Pat beef dry and cut into large cubes",
                        "Peel and quarter onions",
                        "Clean and quarter mushrooms",
                        "Cut carrots into chunks",
                        "Create bouquet garni with herbs"
                    ]
                },
                "Brown beef in batches in hot oil (don't crowd pan)",
                "Remove beef and sauté onions and carrots quickly",
                {
                    text: "Build the sauce",
                    substeps: [
                        "Add tomato paste and stir",
                        "Pour in red wine, scraping up browned bits",
                        "Add beef broth and bouquet garni",
                        "Return beef to pot"
                    ]
                },
                "Bring to simmer, cover and cook at low heat for 2.5-3 hours",
                {
                    text: "Final steps",
                    substeps: [
                        "Add mushrooms in last 30 minutes",
                        "Taste and adjust seasoning",
                        "Remove bouquet garni",
                        "Let rest 10 minutes before serving"
                    ]
                },
                "Serve hot with mashed potatoes or egg noodles"
            ]
        },
        {
            id: 7,
            title: "Vegetable Stir-Fry",
            time: 20,
            difficulty: "easy",
            description: "Quick and colorful stir-fried vegetables with ginger and soy sauce.",
            category: "vegetarian",
            ingredients: [
                "2 cups broccoli florets",
                "1 bell pepper, sliced",
                "1 cup snap peas",
                "2 carrots, julienned",
                "3 cloves garlic, minced",
                "2 tbsp soy sauce",
                "1 tbsp ginger, minced",
                "2 tbsp vegetable oil",
                "1 tsp sesame oil"
            ],
            steps: [
                "Heat wok or large pan over high heat",
                "Add 1 tbsp vegetable oil",
                "Add garlic and ginger, stir-fry for 30 seconds",
                "Add broccoli and carrots, cook for 2 minutes",
                "Add bell pepper and snap peas",
                "Stir-fry for another 2-3 minutes until vegetables are tender-crisp",
                "Pour in soy sauce and sesame oil",
                "Toss everything together",
                "Serve immediately over rice"
            ]
        },
        {
            id: 8,
            title: "Homemade Pasta",
            time: 60,
            difficulty: "hard",
            description: "Fresh handmade pasta from scratch with simple flour and eggs.",
            category: "pasta",
            ingredients: [
                "300g all-purpose flour",
                "3 large eggs",
                "1 tbsp olive oil",
                "Salt",
                "Water (if needed)"
            ],
            steps: [
                {
                    text: "Make the dough",
                    substeps: [
                        "Pour flour on work surface and create well",
                        "Crack eggs into the well",
                        "Add olive oil and salt to eggs",
                        "Using fork, gently beat eggs",
                        {
                            text: "Incorporate flour gradually",
                            substeps: [
                                "Push flour from sides into egg mixture",
                                "Mix until shaggy dough forms",
                                "Knead by hand for 10 minutes",
                                "Add water 1 tbsp at a time if too dry"
                            ]
                        },
                        "Dough should be smooth and slightly elastic"
                    ]
                },
                "Wrap dough in plastic and rest for 30 minutes",
                {
                    text: "Shape the pasta",
                    substeps: [
                        "Divide dough into manageable portions",
                        "Flatten with hand, then roll with rolling pin",
                        "Continue rolling until very thin",
                        "Cut into desired shapes (fettuccine, pappardelle, etc.)"
                    ]
                },
                "Dust pasta with flour to prevent sticking",
                "Dry for at least 30 minutes before cooking",
                "Boil in salted water for 2-3 minutes fresh pasta",
                "Drain and serve with your favorite sauce"
            ]
        }
    ];

    // ============================================
    // PRIVATE: STATE VARIABLES
    // ============================================
    let currentFilter = 'all';
    let currentSort = 'none';

    // ============================================
    // PRIVATE: DOM REFERENCES
    // ============================================
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // ============================================
    // PRIVATE: RECURSIVE FUNCTION FOR STEPS
    // ============================================

    /**
     * Recursively renders nested steps/substeps
     * @param {Array} steps - Array of step strings or objects with substeps
     * @param {Number} level - Current nesting level (0 = top level)
     * @returns {String} HTML string with nested lists
     */
    const renderSteps = (steps, level = 0) => {
        // Determine the CSS class based on nesting level
        const listClass = level === 0 ? 'steps-list' : 'substeps-list';
        
        let html = `<ol class="${listClass}">`;
        
        steps.forEach(step => {
            // Check if step is a string or object with substeps
            if (typeof step === 'string') {
                // Simple step - just add as list item
                html += `<li>${step}</li>`;
            } else if (step && typeof step === 'object' && step.text) {
                // Nested step - has text and substeps
                html += `<li>`;
                html += step.text;  // Main step text
                
                // Recursively call renderSteps for substeps
                if (step.substeps && step.substeps.length > 0) {
                    // RECURSIVE CALL - handles any depth of nesting!
                    html += renderSteps(step.substeps, level + 1);
                }
                
                html += `</li>`;
            }
        });
        
        html += `</ol>`;
        return html;
    };

    /**
     * Creates complete steps HTML for a recipe
     * @param {Array} steps - Recipe steps array
     * @returns {String} HTML string to embed in card
     */
    const createStepsHTML = (steps) => {
        // Check if steps exist
        if (!steps || steps.length === 0) {
            return '<p class="empty-message">No steps available</p>';
        }
        
        // Call the recursive function to generate the nested list
        return renderSteps(steps);
    };

    // ============================================
    // PRIVATE: CREATE RECIPE CARD HTML
    // ============================================

    /**
     * Creates HTML for a single recipe card
     * @param {Object} recipe - Recipe object
     * @returns {String} HTML for the recipe card
     */
    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                </div>
                
                <p>${recipe.description}</p>
                
                <!-- Toggle Buttons -->
                <div class="card-actions">
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                        🥗 Show Ingredients
                    </button>
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                        📋 Show Steps
                    </button>
                </div>
                
                <!-- Ingredients Section (hidden by default) -->
                <div class="ingredients-container" data-recipe-id="${recipe.id}">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Steps Section (hidden by default) -->
                <div class="steps-container" data-recipe-id="${recipe.id}">
                    <h4>Cooking Steps:</h4>
                    ${createStepsHTML(recipe.steps)}
                </div>
            </div>
        `;
    };

    // ============================================
    // PRIVATE: FILTER & SORT FUNCTIONS
    // ============================================

    /**
     * Filters recipes by difficulty level
     * @param {Array} recipeList - Array of recipes
     * @param {String} difficulty - Difficulty level to filter by
     * @returns {Array} Filtered recipes
     */
    const filterByDifficulty = (recipeList, difficulty) => {
        if (difficulty === 'all') {
            return recipeList;
        }
        return recipeList.filter(recipe => recipe.difficulty === difficulty);
    };

    /**
     * Sorts recipes by name alphabetically
     * @param {Array} recipeList - Array of recipes
     * @returns {Array} Sorted recipes
     */
    const sortByName = (recipeList) => {
        return [...recipeList].sort((a, b) => a.title.localeCompare(b.title));
    };

    /**
     * Sorts recipes by cooking time
     * @param {Array} recipeList - Array of recipes
     * @returns {Array} Sorted recipes
     */
    const sortByTime = (recipeList) => {
        return [...recipeList].sort((a, b) => a.time - b.time);
    };

    /**
     * Applies selected filter to recipes
     * @param {Array} recipeList - Array of recipes
     * @param {String} filterType - Filter type
     * @returns {Array} Filtered recipes
     */
    const applyFilter = (recipeList, filterType) => {
        return filterByDifficulty(recipeList, filterType);
    };

    /**
     * Applies selected sort to recipes
     * @param {Array} recipeList - Array of recipes
     * @param {String} sortType - Sort type
     * @returns {Array} Sorted recipes
     */
    const applySort = (recipeList, sortType) => {
        switch(sortType) {
            case 'name':
                return sortByName(recipeList);
            case 'time':
                return sortByTime(recipeList);
            default:
                return recipeList;
        }
    };

    // ============================================
    // PRIVATE: DISPLAY UPDATE FUNCTION
    // ============================================

    /**
     * Updates the recipe display based on current filter and sort
     */
    const updateDisplay = () => {
        // Start with all recipes
        let displayRecipes = applyFilter(recipes, currentFilter);
        
        // Apply sort
        displayRecipes = applySort(displayRecipes, currentSort);
        
        // Render recipes to DOM
        if (displayRecipes.length === 0) {
            recipeContainer.innerHTML = `
                <div class="empty-message">
                    <p>No recipes found matching your filters.</p>
                </div>
            `;
        } else {
            recipeContainer.innerHTML = displayRecipes.map(createRecipeCard).join('');
        }
    };

    // ============================================
    // PRIVATE: EVENT HANDLERS
    // ============================================

    /**
     * Handles filter button clicks
     * @param {Event} event - Click event
     */
    const handleFilterClick = (event) => {
        const filterType = event.target.dataset.filter;
        if (!filterType) return;
        
        currentFilter = filterType;
        
        // Update active button styling
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Refresh display
        updateDisplay();
    };

    /**
     * Handles sort button clicks
     * @param {Event} event - Click event
     */
    const handleSortClick = (event) => {
        const sortType = event.target.dataset.sort;
        if (sortType === undefined) return;
        
        currentSort = sortType;
        
        // Update active button styling
        sortButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Refresh display
        updateDisplay();
    };

    /**
     * Handles toggle button clicks using event delegation
     * Uses event delegation pattern - one listener catches all clicks
     * @param {Event} event - Click event from child element
     */
    const handleToggleClick = (event) => {
        // Check if clicked element is a toggle button
        if (!event.target.classList.contains('toggle-btn')) {
            return;  // Not a toggle button, ignore
        }
        
        const button = event.target;
        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;  // "steps" or "ingredients"
        
        // Find the corresponding container
        const containerClass = toggleType === 'steps' ? 'steps-container' : 'ingredients-container';
        const container = document.querySelector(`.${containerClass}[data-recipe-id="${recipeId}"]`);
        
        // Toggle visibility
        if (container) {
            container.classList.toggle('visible');
            
            // Update button text
            const isVisible = container.classList.contains('visible');
            if (toggleType === 'steps') {
                button.textContent = isVisible ? '📋 Hide Steps' : '📋 Show Steps';
            } else {
                button.textContent = isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients';
            }
        }
    };

    // ============================================
    // PRIVATE: UTILITY FUNCTIONS
    // ============================================

    /**
     * Updates the visual state of active buttons
     */
    const updateActiveButtons = () => {
        filterButtons.forEach(btn => {
            const isActive = btn.dataset.filter === currentFilter;
            btn.classList.toggle('active', isActive);
        });

        sortButtons.forEach(btn => {
            const isActive = btn.dataset.sort === currentSort;
            btn.classList.toggle('active', isActive);
        });
    };

    // ============================================
    // PRIVATE: SETUP AND INITIALIZATION
    // ============================================

    /**
     * Attaches all event listeners
     * Includes event delegation for dynamic elements
     */
    const setupEventListeners = () => {
        // Filter buttons - direct listeners
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });
        
        // Sort buttons - direct listeners
        sortButtons.forEach(btn => {
            btn.addEventListener('click', handleSortClick);
        });
        
        // Toggle buttons - event delegation
        // Single listener on parent handles all toggle buttons
        recipeContainer.addEventListener('click', handleToggleClick);
        
        console.log('Event listeners attached!');
    };

    /**
     * Initializes the app
     * Call this once when page loads
     */
    const init = () => {
        console.log('RecipeApp initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('RecipeApp ready!');
    };

    // ============================================
    // PUBLIC API
    // ============================================
    // Only what's returned is accessible from outside the IIFE
    return {
        init: init,
        updateDisplay: updateDisplay
    };

})();  // <-- IIFE is immediately invoked here

// ============================================
// START THE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    RecipeApp.init();
});
