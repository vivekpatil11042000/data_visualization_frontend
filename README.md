# MQTT Data Visualization Frontend

A React web application that displays real-time MQTT data from a FastAPI backend connected to MongoDB.

## Features

- 🔄 **Real-time Data Display**: Fetches and displays the latest MQTT document data
- 🔁 **Auto-refresh**: Configurable automatic data refresh (10s, 30s, 1m, 5m intervals)
- 📱 **Responsive Design**: Clean, mobile-friendly interface using Tailwind CSS
- 🎯 **Error Handling**: Comprehensive error handling with user-friendly messages
- 📊 **Data Visualization**: Displays document ID, payload data, and timestamps
- ⚡ **Performance**: Optimized with React hooks and efficient state management

## Project Structure

```
data_visualization_frontend/
├── package.json              # Dependencies and scripts
├── public/
│   ├── index.html           # HTML template
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/
│   │   └── DataCard.js      # Reusable component to display MQTT data
│   ├── pages/
│   │   └── HomePage.js      # Main page with data fetching and rendering
│   ├── services/
│   │   └── api.js           # Axios API client for backend communication
│   ├── utils/
│   │   └── dateTimeUtil.js  # Utility functions for date/time formatting
│   ├── App.js               # Main App component
│   ├── App.css              # App-specific styles
│   ├── index.js             # React entry point
│   └── index.css            # Global styles with Tailwind
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .env                     # Environment variables
├── .env.example             # Environment variables template
└── .gitignore              # Git ignore rules
```

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **FastAPI backend** running on `http://localhost:8000` (or configured URL)

## Installation & Setup

### 1. Clone and Navigate

```bash
# If you haven't already cloned the repository
git clone <repository-url>
cd data_visualization/data_visualization_frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file to match your setup:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000

# Development settings
GENERATE_SOURCEMAP=true

# Optional: Change the development server port
# PORT=3000
```

**Important Environment Variables:**
- `REACT_APP_API_BASE_URL`: The base URL of your FastAPI backend (default: `http://localhost:8000`)

### 4. Start the Development Server

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The application will open in your browser at `http://localhost:3000`.

## API Integration

The frontend connects to the FastAPI backend endpoint:

- **Endpoint**: `GET /api/v1/mqtt/latest-mqtt-document`
- **Response Format**:
  ```json
  {
    "id": "0006394492CE2D11F4450000265C0000",
    "payload": {
      "heartBeatRate": 72,
      "timestamp": 1751816536
    },
    "publish_received_at": 1751816543808
  }
  ```

## Usage

### Main Features

1. **Data Display**: The main dashboard shows the latest MQTT document with:
   - Document ID
   - Payload data (including heart beat rate if available)
   - Formatted timestamps (absolute and relative)

2. **Auto-refresh**: Toggle automatic data refresh with configurable intervals:
   - 10 seconds
   - 30 seconds (default)
   - 1 minute
   - 5 minutes

3. **Manual Refresh**: Click the "Refresh" button to manually fetch the latest data

4. **Error Handling**: Clear error messages when the backend is unavailable or returns errors

### Data Card Features

- **Live Status Indicator**: Shows connection status with animated indicators
- **Payload Visualization**: Displays heart beat rate with visual indicators
- **Raw Payload View**: Expandable section to view complete JSON payload
- **Timestamp Information**: Shows both absolute and relative timestamps
- **Responsive Design**: Adapts to different screen sizes

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

### Code Structure

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Main page components in `src/pages/`
- **Services**: API integration logic in `src/services/`
- **Utils**: Helper functions in `src/utils/`

### Styling

The application uses **Tailwind CSS** for styling:
- Responsive design with mobile-first approach
- Custom color palette for consistent theming
- Utility-first CSS approach
- Custom animations and transitions

## Production Build

To create a production build:

```bash
npm run build
```

This creates a `build/` directory with optimized files ready for deployment.

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the FastAPI backend is running on the configured URL
   - Check the `REACT_APP_API_BASE_URL` in your `.env` file
   - Verify CORS settings in the backend

2. **Dependencies Issues**
   - Delete `node_modules/` and `package-lock.json`
   - Run `npm install` again

3. **Port Already in Use**
   - Change the port in `.env`: `PORT=3001`
   - Or kill the process using the port

### Backend Requirements

Ensure your FastAPI backend:
- Is running on the configured URL (default: `http://localhost:8000`)
- Has the endpoint `/api/v1/mqtt/latest-mqtt-document`
- Returns data in the expected format
- Has proper CORS configuration for frontend requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure and naming conventions
2. Use Tailwind CSS for styling
3. Add proper error handling for new features
4. Update documentation for significant changes

## License

This project is part of the MQTT Data Visualization system.