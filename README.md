# React Data Dashboard

A modern, real-time analytics dashboard built with React, featuring interactive charts, live data updates, and a sleek dark theme interface.

## 🚀 Features

- **Real-time Data Monitoring**: Toggle live data updates with smooth animations
- **Interactive Charts**: Multiple chart types including line charts, bar charts, pie charts, and area charts
- **Metric Filtering**: Selectively show/hide different system metrics (CPU, Memory, Network, Disk)
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dark Theme**: Modern dark UI with Tailwind CSS styling
- **System Status Indicators**: Visual status alerts for system health monitoring
- **Time Range Selection**: Choose from multiple time ranges (5 minutes to 7 days)
- **Smooth Animations**: Enhanced user experience with chart animations and transitions

## 📊 Dashboard Components

### Stats Cards
- CPU Usage with trend indicators
- Memory Usage monitoring
- Network I/O throughput
- Disk Usage tracking

### Charts
- **System Metrics Timeline**: Multi-line chart showing CPU, memory, network, and disk usage over time
- **Resource Distribution**: Pie chart displaying resource allocation breakdown
- **Weekly Performance**: Bar chart comparing successful vs failed operations
- **Network Traffic**: Area chart visualizing network data flow

### System Status
- Real-time system health indicators
- Alert notifications for various system states
- Color-coded status messages

## 🛠️ Tech Stack

- **React 19.1.0** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Recharts 3.1.0** - Chart library for React
- **Lucide React 0.533.0** - Icon library
- **ESLint** - Code linting and formatting

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-data-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
src/
├── components/
│   └── DataDashboard.jsx    # Main dashboard component
├── assets/
│   └── react.svg           # React logo
├── App.jsx                 # Root component
├── main.jsx               # Application entry point
└── index.css              # Tailwind CSS imports
```

## 🎛️ Usage

### Real-time Mode
- Click the "Live/Paused" button in the header to toggle real-time data updates
- Data refreshes every 2 seconds when in live mode

### Metric Filtering
- Use the metric toggle buttons to show/hide specific data series
- Available metrics: CPU, Memory, Network, Disk

### Time Range Selection
- Choose from predefined time ranges in the dropdown
- Options: 5 minutes, 1 hour, 6 hours, 24 hours, 7 days

### Manual Refresh
- Click the refresh button to generate new sample data
- Useful when not in real-time mode

## 📈 Data Generation

The dashboard generates realistic sample data with:
- Sinusoidal patterns for natural-looking metrics
- Random variations to simulate real system behavior
- Sliding window data management for performance
- Smooth transitions between data points

## 🎨 Customization

### Colors and Themes
Chart colors and UI themes can be customized in the [`DataDashboard`](src/components/DataDashboard.jsx) component:
- Modify the color constants for chart series
- Update Tailwind CSS classes for UI elements

### Chart Configuration
Charts are built with Recharts and can be customized:
- Animation duration and easing
- Chart margins and dimensions
- Tooltip styling and content

### Data Structure
The data generation functions can be modified to match your specific use case:
- [`generateData`](src/components/DataDashboard.jsx) - Time series data
- [`generatePieData`](src/components/DataDashboard.jsx) - Resource distribution
- [`generateBarData`](src/components/DataDashboard.jsx) - Weekly performance metrics

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React and Tailwind plugins configured in [`vite.config.js`](vite.config.js).

### ESLint Configuration
Code quality is maintained with ESLint rules defined in [`eslint.config.js`](eslint.config.js), including React Hooks and React Refresh plugins.

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- Mobile: Single column layout
- Tablet: 2-column grid for stats cards
- Desktop: 4-column grid with full chart layouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

To deploy the dashboard:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service of choice (Vercel, Netlify, etc.)

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.
