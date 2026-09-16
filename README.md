# 😂 Random Joke Generator

A fun and interactive web application that fetches random jokes from multiple APIs. Features favorites, history tracking, and sharing capabilities.

## ✨ Features

✅ **Multiple API Support**
   - JokeAPI - Diverse jokes with categories
   - Official Joke API - Classic joke setup/punchline format
   - Useless Facts API - Fun and random facts
   - Mixed mode - Random selection from all APIs

✅ **Customization Options**
   - Choose different joke APIs
   - Select joke categories (General, Programming, Knock-Knock, Any)
   - Safe mode toggle for family-friendly content

✅ **Joke Management**
   - ❤️ Add jokes to favorites
   - 📜 View recently viewed jokes
   - 📋 Copy jokes to clipboard
   - 📤 Share jokes via social media or link

✅ **Persistent Storage**
   - Save favorite jokes locally
   - Track recently viewed jokes
   - Browser storage automatically syncs

✅ **User-Friendly Interface**
   - Clean, modern design with gradient background
   - Responsive layout for all devices
   - Smooth animations and transitions
   - Loading states and error handling

✅ **No Dependencies** - Pure vanilla JavaScript

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch jokes from APIs)
- No installation required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/webmasterindia/random-joke-generator.git
cd random-joke-generator
```

2. Open `index.html` in your browser:
```bash
# Option 1: Double-click the file
index.html

# Option 2: Using Python
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Using Node.js
http-server
```

3. Click "Generate Joke" to start!

## 📖 Usage Guide

### Generating Jokes

1. **Select API**: Choose which joke API to use from the dropdown
   - **JokeAPI**: Wide variety of jokes
   - **Official Joke API**: Classic joke format
   - **Useless Facts**: Fun facts instead of jokes
   - **Random Mixed**: Random selection from all APIs

2. **Choose Category**: (Available for JokeAPI)
   - General - General humor
   - Programming - Tech jokes
   - Knock-Knock - Classic knock-knock jokes
   - Any - All categories

3. **Enable Safe Mode**: Toggle for family-friendly content

4. **Click Generate Joke**: Fetch a new joke!

### Managing Jokes

**Copy to Clipboard**
- Click the 📋 icon on the joke card
- Joke is copied and ready to share

**Share Joke**
- Click "Share" button
- Opens native share dialog (if supported)
- Or copies to clipboard as fallback

**Add to Favorites**
- Heart icon (❤️) in favorites section
- Saves joke for later
- Access from "Favorites" panel

**View History**
- Last 10 jokes automatically tracked
- Displayed in "Recently Viewed" section
- Add any history item to favorites

## 🌐 Supported APIs

### 1. JokeAPI (v2.jokeapi.dev)
- **URL**: https://v2.jokeapi.dev/
- **Features**: Multiple categories, safe mode, setup/delivery format
- **Rate Limit**: Generous (1000+ requests/hour)
- **Format**: 
```json
{
  "setup": "Why did the programmer...",
  "delivery": "...because he wanted more cache!",
  "category": "Programming"
}
```

### 2. Official Joke API (official-joke-api.appspot.com)
- **URL**: https://official-joke-api.appspot.com/
- **Features**: Random jokes, classic format
- **Rate Limit**: No strict limit
- **Format**:
```json
{
  "setup": "Why did the chicken cross...",
  "punchline": "...to get to the other side!",
  "type": "general"
}
```

### 3. Useless Facts API (uselessfacts.jsoup.com)
- **URL**: https://uselessfacts.jsoup.com/
- **Features**: Random fun facts, no jokes
- **Rate Limit**: Generous
- **Format**:
```json
{
  "text": "A group of flamingos is called a 'flamboyance'..."
}
```

## 💾 Data Storage

**LocalStorage Structure**:
```javascript
// Favorites
localStorage.getItem('jokesFavorites') // Array of favorite jokes

// History
localStorage.getItem('jokesHistory') // Array of recently viewed jokes
```

**Data Persistence**:
- Automatically saves on selection
- Persists across browser sessions
- Clear with "Clear All" buttons
- Or manually via DevTools

## 📱 Responsive Design

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 480px | Single column |
| Tablet | 480-768px | Single column |
| Desktop | > 1024px | Multi-column |

## 🎨 UI Components

### Joke Card
- Source badge (API name)
- Main joke text
- Punchline (if applicable)
- Category and type tags
- Copy and share buttons

### Favorites Panel
- List of saved jokes
- Quick copy button
- Delete button
- Clear all option

### History Panel
- Last 10 viewed jokes
- Add to favorites button
- Copy button
- Auto-remove oldest on new additions

## 🔧 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Gradients, animations, responsive design
- **JavaScript (ES6+)** - Fetch API, LocalStorage, DOM manipulation
- **APIs** - External joke/fact APIs via CORS

## 📊 Performance

- **Load Time**: < 1 second
- **API Response**: 500-2000ms (API dependent)
- **Bundle Size**: ~40KB (HTML+CSS+JS combined)
- **Browser Memory**: < 5MB

## 🌍 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## 🚨 Troubleshooting

### "No joke found" Error
- Check internet connection
- Verify API is accessible
- Try different API or category
- Refresh page and retry

### Copy to Clipboard Not Working
- Check browser permissions
- Enable HTTPS (required for clipboard API)
- Use different browser
- Manual copy via selection

### Empty Favorites/History
- Browser cache might be cleared
- Check localStorage is enabled
- Verify DevTools > Application > Storage

## 📈 Future Enhancements

- [ ] Rating system for jokes
- [ ] Dark mode toggle
- [ ] Custom joke submissions
- [ ] Search within favorites
- [ ] Export favorites as JSON
- [ ] Push notifications for new jokes
- [ ] Joke difficulty levels
- [ ] Translation support
- [ ] Voice narration
- [ ] Social media integration

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **webmasterindia**

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Submit a pull request
- Check API status pages

---

**Made with 💙 to bring smiles and laughter!**

### API Credits
- [JokeAPI](https://jokeapi.dev) - Comprehensive joke database
- [Official Joke API](https://official-joke-api.appspot.com) - Classic jokes
- [Useless Facts API](https://uselessfacts.jsoup.com) - Fun facts