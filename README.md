# 🍳 Functional Recipe App - Part 3

A comprehensive JavaScript recipe application demonstrating **IIFE Module Pattern**, **Recursion**, and **Event Delegation**.

## 🚀 Features Implemented

### 1. **IIFE Module Pattern (Encapsulation)**
- Entire app wrapped in Immediately Invoked Function Expression
- Private variables and functions stay hidden from global scope
- Public API exposed through return object
- Prevents variable name collisions and accidental modifications

```javascript
const RecipeApp = (() => {
    // Private: recipes, state, helpers
    const recipes = [...];
    
    // Public API
    return {
        init: init,
        updateDisplay: updateDisplay
    };
})();
```

### 2. **Recursive Steps Rendering**
- Handles any level of nested substeps automatically
- `renderSteps()` function calls itself for nested items
- Supports unlimited nesting depth
- Different CSS styling for each nesting level

Example data structure:
```javascript
steps: [
    "Boil water",                          // String step
    {
        text: "Make sauce",                // Object with substeps
        substeps: [
            "Heat oil",
            "Add garlic",
            {
                text: "Make spice mix",    // Nested deeper!
                substeps: ["Grind cumin", "Add chili"]
            }
        ]
    }
]
```

### 3. **Toggle Buttons for Each Card**
- **"Show Ingredients"** button - reveals ingredient list
- **"Show Steps"** button - reveals cooking instructions
- Buttons dynamically update text (Show → Hide)
- Multiple sections can be open simultaneously

### 4. **Event Delegation**
- Single event listener on parent container
- Handles clicks on all toggle buttons efficiently
- Works with dynamically created elements
- Better performance than individual listeners

```javascript
recipeContainer.addEventListener('click', handleToggleClick);
```

### 5. **Enhanced Recipe Data**
- **8 recipes** with complete information
- **Ingredients arrays** (4-8 items each)
- **Steps arrays** (5-10 steps with nesting)
- **Deep nesting** in 2+ recipes (Chocolate Lava Cake, Beef Bourguignon)

### 6. **Professional CSS Styling**
- Expandable sections with smooth animations
- Numbered steps with circular counters
- Nested steps with arrows and colored borders
- Responsive design (works on mobile)
- Visual hierarchy with colors and indentation

## 📁 Project Structure

```
recipie-js-functional-cooking/
├── index.html          # HTML structure with controls and container
├── style.css           # Comprehensive styling with animations
├── app.js              # Main JavaScript (IIFE module)
└── README.md           # Documentation
```

## 🏃‍♂️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/lohithchinthalalpalli/recipie-js-functional-cooking.git
   cd recipie-js-functional-cooking
   ```

2. **Checkout the feature branch**
   ```bash
   git checkout feature/iife-recursion-toggles
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or serve with a local server
   python -m http.server 8000
   ```

4. **View at** `http://localhost:8000`

## 🧪 Testing Checklist

### ✅ Initial Load
- [ ] All recipe cards display without errors
- [ ] Toggle buttons visible on each card
- [ ] No ingredients or steps shown initially
- [ ] Console shows "RecipeApp initializing..." and "RecipeApp ready!"

### ✅ Toggle Functionality
- [ ] Click "Show Ingredients" → ingredients appear
- [ ] Button text changes to "Hide Ingredients"
- [ ] Click "Hide Ingredients" → ingredients disappear
- [ ] Multiple cards can have open sections simultaneously

### ✅ Steps Display
- [ ] Click "Show Steps" → numbered steps appear
- [ ] Nested substeps display with arrows
- [ ] Multiple nesting levels show clean indentation
- [ ] CSS counter properly numbers main steps

### ✅ Recursion Testing
- [ ] Chocolate Lava Cake shows 3-level nesting
- [ ] Beef Bourguignon shows 2-level nesting
- [ ] All nesting levels render correctly
- [ ] Different styling per level (color, size, border)

### ✅ Filtering & Sorting
- [ ] Filter by difficulty still works
- [ ] Sort by name/time still works
- [ ] Expanded sections stay open after filter/sort
- [ ] Content updates correctly after filtering

### ✅ IIFE Encapsulation
- [ ] Type `recipes` in console → undefined
- [ ] Type `RecipeApp` → shows object with init and updateDisplay
- [ ] Type `RecipeApp.renderSteps` → undefined (private)
- [ ] Private functions aren't accessible from console

### ✅ Event Delegation
- [ ] No console errors when clicking buttons
- [ ] Buttons respond after card creation
- [ ] All buttons work (not just first ones)

## 🎯 Core Concepts Demonstrated

### IIFE (Immediately Invoked Function Expression)
- Creates private scope for variables
- Prevents global namespace pollution
- Exposes only necessary public API
- Professional module pattern

### Recursion
- `renderSteps()` calls itself for nested items
- Base case: strings and leaf items
- Recursive case: objects with substeps
- Handles unlimited nesting depth

### Event Delegation
- One listener on parent catches child clicks
- More efficient than multiple listeners
- Works with dynamic content
- Check `e.target` for actual clicked element

### DOM State Management
- CSS classes (`visible`) control visibility
- `classList.toggle()` for show/hide
- `data-*` attributes for element identification
- Dynamic button text updates

## 📊 Recipe Data Overview

| Recipe | Difficulty | Time | Nesting |
|--------|-----------|------|---------|
| Spaghetti Carbonara | Easy | 25m | 1 level |
| Margherita Pizza | Easy | 30m | None |
| Thai Green Curry | Medium | 40m | 2 levels |
| Chocolate Lava Cake | Medium | 20m | **3 levels** ⭐ |
| Grilled Salmon | Easy | 25m | None |
| Beef Bourguignon | Hard | 180m | **2 levels** ⭐ |
| Vegetable Stir-Fry | Easy | 20m | None |
| Homemade Pasta | Hard | 60m | 2 levels |

## 🔑 Key JavaScript Patterns

### Recursive Function Pattern
```javascript
const renderSteps = (steps, level = 0) => {
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    let html = `<ol class="${listClass}">`;
    
    steps.forEach(step => {
        if (typeof step === 'string') {
            html += `<li>${step}</li>`;
        } else {
            html += `<li>${step.text}`;
            if (step.substeps?.length > 0) {
                html += renderSteps(step.substeps, level + 1);  // RECURSION!
            }
            html += `</li>`;
        }
    });
    
    return html + `</ol>`;
};
```

### Event Delegation Pattern
```javascript
const handleToggleClick = (event) => {
    if (!event.target.classList.contains('toggle-btn')) return;
    
    const { recipeId, toggle } = event.target.dataset;
    const container = document.querySelector(
        `.${toggle}-container[data-recipe-id="${recipeId}"]`
    );
    
    container?.classList.toggle('visible');
};

recipeContainer.addEventListener('click', handleToggleClick);
```

### IIFE Module Pattern
```javascript
const App = (() => {
    // Private
    const privateVar = 'hidden';
    const privateFunc = () => {};
    
    // Public
    return {
        publicMethod: () => { /* can use privateVar */ }
    };
})();
```

## 🎨 CSS Features

- **Responsive grid** layout
- **Smooth animations** for expanding sections
- **CSS counters** for numbered steps
- **Nested borders** with color gradients
- **Pseudo-elements** (::before) for icons
- **Gradient background** and card shadows
- **Mobile-first** design approach

## 🚀 Performance Optimizations

- **Event delegation** instead of multiple listeners
- **Efficient DOM updates** using innerHTML
- **CSS classes** for state management
- **Data attributes** for element identification
- **Arrow functions** with proper scope
- **String template literals** for HTML generation

## 📚 Learning Resources Covered

1. **IIFE Module Pattern**
   - Encapsulation and privacy
   - Public vs private API
   - Module pattern best practices

2. **Recursion**
   - Handling nested data structures
   - Base cases and recursive cases
   - Depth-first traversal

3. **Event Delegation**
   - Event bubbling
   - Efficient event handling
   - Dynamic element selection

4. **DOM Manipulation**
   - classList API
   - querySelector with data attributes
   - Dynamic HTML generation

5. **Functional Programming**
   - Pure functions (filter, sort)
   - Function composition
   - Immutability patterns

## 🔗 GitHub Branch

- **Branch**: `feature/iife-recursion-toggles`
- **Repository**: [recipie-js-functional-cooking](https://github.com/lohithchinthalalpalli/recipie-js-functional-cooking)

## 📝 Files Changed

- ✅ `app.js` - Main application (IIFE + recursion + event delegation)
- ✅ `index.html` - HTML structure with controls
- ✅ `style.css` - Professional styling with animations
- ✅ `README.md` - Complete documentation

## 🎓 Educational Value

This project demonstrates:
- Professional JavaScript architecture
- Advanced data structure handling (recursion)
- Efficient DOM event handling
- Modern CSS animations and layouts
- Code organization and encapsulation
- Best practices for maintainable code

## ✨ Highlights

🏆 **Deepest Nesting**: Chocolate Lava Cake (3 levels)
- Main step → Batter step → Final ingredients step → Deep step

🎯 **Perfect Encapsulation**: Only `init()` and `updateDisplay()` exposed

⚡ **Event Efficiency**: 1 listener instead of 16+ button listeners

🎨 **Beautiful UI**: Smooth animations and visual hierarchy

## 💡 Next Steps (Future Enhancements)

- Add search functionality
- Save favorite recipes to localStorage
- Add recipe ratings/reviews
- Add cooking timer
- Export recipes as PDF
- Dark mode toggle
- Accessibility improvements (ARIA labels)

---

**Created**: February 2026  
**Status**: ✅ Complete with all features implemented and tested
