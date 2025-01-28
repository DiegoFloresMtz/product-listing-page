## Key Features Implementation

### Infinite Scroll
- Implemented in ProductPage.tsx
- Loads more products as user scrolls
- Maintains smooth performance with large datasets

### Search Functionality
- Real-time search in titles and descriptions
- Price-based search (e.g., "50" shows products under $50)
- Debounced input to prevent excessive API calls

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Persistent state using Redux
- Hover preview with total calculation

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Heroicons](https://heroicons.com/) - Icons
- [JSON Server](https://github.com/typicode/json-server) - Mock API

## Installation 
1. `npm install` - Install dependencies
2. `npm run dev` - Start development on port 3000
3. `npx json-server --watch db.json --port 3001` - On another terminal for the mock data fetching
4. `npm test` - For testing using jest

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

