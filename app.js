// Wrap entire app in IIFE for encapsulation
const RecipeApp = (() => {
  // ============================================
  // PRIVATE: DATA
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
      title: "Simple Tomato Soup",
      time: 40,
      difficulty: "easy",
      description: "Comforting tomato soup with basil and cream.",
      category: "soup",
      ingredients: ["1kg ripe tomatoes","1 onion","2 cloves garlic","500ml vegetable stock","Fresh basil","Cream (optional)","Salt & pepper"],
      steps: [
        "Chop onions and garlic",
        "Saute onions and garlic until soft",
        {
          text: "Cook tomatoes",
          substeps: [
            "Add chopped tomatoes to pan",
            "Pour in stock",
            "Simmer 20 minutes"
          ]
        },
        "Blend until smooth",
        "Season and serve with basil and a splash of cream"
      ]
    },
    {
      id: 3,
      title: "Roast Chicken with Herbs",
      time: 90,
      difficulty: "medium",
      description: "Juicy roast chicken with garlic and herbs.",
      category: "poultry",
      ingredients: ["1 whole chicken (1.5kg)","2 tbsp olive oil","3 cloves garlic","Fresh rosemary","Lemon","Salt & pepper"],
      steps: [
        "Preheat oven to 200°C",
        {
          text: "Prepare chicken",
          substeps: [
            "Pat chicken dry",
            "Rub with oil, garlic, herbs, salt and pepper",
            {
              text: "Stuff cavity",
              substeps: ["Insert lemon halves","Add extra rosemary"]
            }
          ]
        },
        "Roast for 1 hour 15 minutes until juices run clear",
        "Rest 10 minutes before carving"
      ]
    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      time: 20,
      difficulty: "easy",
      description: "Quick stir fry with seasonal vegetables and soy sauce.",
      category: "vegetarian",
      ingredients: ["Assorted vegetables (broccoli, peppers, carrots)","2 tbsp soy sauce","1 tbsp sesame oil","2 cloves garlic","1 tsp ginger"],
      steps: [
        "Chop all vegetables into bite-sized pieces",
        "Heat wok with sesame oil",
        "Stir fry garlic and ginger briefly",
        "Add vegetables and cook until tender-crisp",
        "Add soy sauce and toss to coat",
        "Serve over rice or noodles"
      ]
    },
    {
      id: 5,
      title: "Beef Tacos",
      time: 35,
      difficulty: "medium",
      description: "Spiced beef tacos with fresh salsa.",
      category: "mexican",
      ingredients: ["500g minced beef","Taco seasoning","8 taco shells","Lettuce","Tomato","Onion","Cheese"],
      steps: [
        "Brown the minced beef in a pan",
        "Add taco seasoning and a splash of water",
        "Simmer until thickened",
        {
          text: "Assemble tacos",
          substeps: [
            "Warm shells",
            "Fill with beef",
            "Top with lettuce, tomato, onion and cheese"
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Chocolate Mug Cake",
      time: 5,
      difficulty: "easy",
      description: "Single-serve chocolate cake ready in minutes.",
      category: "dessert",
      ingredients: ["4 tbsp flour","4 tbsp sugar","2 tbsp cocoa powder","1 egg","3 tbsp milk","3 tbsp oil","Pinch of salt"],
      steps: [
        "Mix dry ingredients in a mug",
        "Add egg, milk and oil, stir to combine",
        "Microwave 90 seconds until set",
        "Let cool slightly and enjoy"
      ]
    },
    {
      id: 7,
      title: "Make Sauce",
      time: 45,
      difficulty: "hard",
      description: "Multi-stage sauce with nested substeps demonstrating recursion.",
      category: "sauce",
      ingredients: ["2 tbsp oil","1 onion","2 cloves garlic","400g tomatoes","Herbs","Salt & pepper"],
      steps: [
        "Prepare ingredients",
        {
          text: "Build flavor base",
          substeps: [
            "Heat oil",
            "Sauté onions until translucent",
            {
              text: "Add aromatics",
              substeps: [
                "Add garlic",
                "Add herbs",
                {
                  text: "Deglaze",
                  substeps: ["Splash of wine","Scrape pan"]
                }
              ]
            }
          ]
        },
        "Add tomatoes and simmer 25 minutes",
        "Blend and season to taste"
      ]
    },
    {
      id: 8,
      title: "Greek Salad",
      time: 10,
      difficulty: "easy",
      description: "Fresh salad with cucumber, tomato, olives and feta.",
      category: "salad",
      ingredients: ["Cucumber","Tomato","Red onion","Feta cheese","Olives","Olive oil","Lemon juice","Oregano"],
      steps: [
        "Chop cucumber, tomato and onion",
        "Combine in bowl with olives and feta",
        "Dress with olive oil, lemon juice and oregano",
        "Toss and serve immediately"
      ]
    }
  ];

  // ============================================
  // PRIVATE: STATE
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
  // PRIVATE: HELPER FUNCTIONS
  // ============================================
  // Recursive function to render steps (handles nesting)
  const renderSteps = (steps, level = 0) => {
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    let html = `<ol class="${listClass}">`;
    steps.forEach(step => {
      if (typeof step === 'string') {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.text}`;
        if (step.substeps && step.substeps.length > 0) {
          html += renderSteps(step.substeps, level + 1);
        }
        html += `</li>`;
      }
    });
    html += `</ol>`;
    return html;
  };

  // Create complete steps HTML for a recipe
  const createStepsHTML = (steps) => {
    if (!steps || steps.length === 0) return '<p>No steps available</p>';
    return renderSteps(steps);
  };

  // Create recipe card HTML
  const createRecipeCard = (recipe) => {
    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
        <div class="card-actions">
          <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">📋 Show Steps</button>
          <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">🥗 Show Ingredients</button>
        </div>
        <div class="ingredients-container" data-recipe-id="${recipe.id}">
          <h4>Ingredients:</h4>
          <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
        <div class="steps-container" data-recipe-id="${recipe.id}">
          <h4>Cooking Steps:</h4>
          ${createStepsHTML(recipe.steps)}
        </div>
      </div>
    `;
  };

  // Filtering helpers
  const filterByDifficulty = (list, difficulty) => {
    if (!difficulty || difficulty === 'all') return list.slice();
    return list.filter(r => r.difficulty === difficulty);
  };

  const sortByName = (list) => {
    return list.slice().sort((a,b) => a.title.localeCompare(b.title));
  };

  const applyFilter = (list) => filterByDifficulty(list, currentFilter);
  const applySort = (list) => currentSort === 'name' ? sortByName(list) : list;

  // ============================================
  // PRIVATE: EVENT HANDLERS
  // ============================================
  const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    if (!filterType) return;
    currentFilter = filterType;
    updateActiveButtons();
    updateDisplay();
  };

  const handleSortClick = (event) => {
    const sortType = event.target.dataset.sort;
    if (!sortType) return;
    currentSort = sortType;
    updateActiveButtons();
    updateDisplay();
  };

  // Handle toggle button clicks using event delegation
  const handleToggleClick = (event) => {
    if (!event.target.classList.contains('toggle-btn')) return;
    const button = event.target;
    const recipeId = button.dataset.recipeId;
    const toggleType = button.dataset.toggle;
    const containerClass = toggleType === 'steps' ? 'steps-container' : 'ingredients-container';
    const container = document.querySelector(`.${containerClass}[data-recipe-id="${recipeId}"]`);
    if (container) {
      container.classList.toggle('visible');
      const isVisible = container.classList.contains('visible');
      if (toggleType === 'steps') {
        button.textContent = isVisible ? '📋 Hide Steps' : '📋 Show Steps';
      } else {
        button.textContent = isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients';
      }
    }
  };

  const updateActiveButtons = () => {
    filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
    sortButtons.forEach(b => b.classList.toggle('active', b.dataset.sort === currentSort));
  };

  // ============================================
  // PRIVATE: INITIALIZATION
  // ============================================
  const setupEventListeners = () => {
    filterButtons.forEach(btn => btn.addEventListener('click', handleFilterClick));
    sortButtons.forEach(btn => btn.addEventListener('click', handleSortClick));
    recipeContainer.addEventListener('click', handleToggleClick);
    console.log('Event listeners attached!');
  };

  const updateDisplay = () => {
    let list = applyFilter(recipes);
    list = applySort(list);
    recipeContainer.innerHTML = list.map(createRecipeCard).join('');
  };

  const init = () => {
    console.log('RecipeApp initializing...');
    setupEventListeners();
    updateDisplay();
    console.log('RecipeApp ready!');
  };

  // Public API
  return { init, updateDisplay };

})();

// Start the app
document.addEventListener('DOMContentLoaded', () => RecipeApp.init());
