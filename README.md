# React Spectrum 2 Todo App

A modern todo application built with **React Spectrum 2** components, demonstrating the integration of Adobe's design system with Model Context Protocol (MCP) for component documentation.

## 🎯 Project Overview

This project showcases:
- **React Spectrum 2** (`@react-spectrum/s2`) - Adobe's latest design system
- **MCP Integration** - Using Model Context Protocol to access component documentation
- **Modern React** - Hooks, functional components, and clean architecture

## 🚀 Features

- ✅ Add new todo items
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Progress counter showing remaining items
- ✅ Form validation and keyboard shortcuts
- ✅ Responsive design with Spectrum 2 theming

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Spectrum 2** - Adobe's design system components
- **MCP Server** - Component documentation and examples

## 📦 Components Used

All components are sourced from `@react-spectrum/s2` and documented via MCP:

- `Provider` - Theme provider for Spectrum 2
- `Heading` - Page title with semantic levels
- `Form` - Form wrapper with submission handling
- `TextField` - Text input with label and validation
- `Button` - Action buttons with variants
- `Checkbox` - Toggle completion status
- `Card` - Container for todo items
- `Text` - Typography component
- `Divider` - Visual separator

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spectrum-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎨 MCP Integration

This project uses a custom MCP server for React Spectrum 2 component documentation:

### MCP Configuration
Located in `.kiro/settings/mcp.json`:
```json
{
  "mcpServers": {
    "react-spectrum": {
      "command": "node",
      "args": ["mcp-proxy.js"],
      "disabled": false,
      "autoApprove": [
        "get_component",
        "search_components", 
        "list_components"
      ]
    }
  }
}
```

### MCP Proxy Server
The `mcp-proxy.js` file bridges the MCP protocol to a Cloudflare Worker hosting the Spectrum 2 documentation.

## 📁 Project Structure

```
spectrum-todo-app/
├── src/
│   ├── App.jsx          # Main todo application
│   └── main.jsx         # React app entry point
├── .kiro/
│   └── settings/
│       └── mcp.json     # MCP server configuration
├── mcp-proxy.js         # MCP to HTTP bridge
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔄 Migration from Spectrum 1

This project was migrated from React Spectrum 1 to Spectrum 2:

### Before (Spectrum 1)
```javascript
import { Button, TextField } from '@adobe/react-spectrum'
```

### After (Spectrum 2)
```javascript
import { Provider, Button, TextField, Card } from '@react-spectrum/s2'

function App() {
  return (
    <Provider theme="light">
      {/* App content */}
    </Provider>
  )
}
```

## 🎯 Key Differences: Spectrum 1 vs 2

| Feature | Spectrum 1 | Spectrum 2 |
|---------|------------|------------|
| Package | `@adobe/react-spectrum` | `@react-spectrum/s2` |
| Provider | `Provider` with `defaultTheme` | `Provider` with `theme="light"` |
| Components | Limited set | Extended with Card, Modal, etc. |
| Theming | Complex theme objects | Simple string themes |

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the MCP server
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [React Spectrum 2 Documentation](https://react-spectrum.adobe.com/react-spectrum/)
- [Adobe Design System](https://spectrum.adobe.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Vite Documentation](https://vitejs.dev/)