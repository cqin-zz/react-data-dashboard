import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Settings, Play, Pause, RefreshCw, Download, Filter, Eye, EyeOff, Plus, Grid, BarChart3, TrendingUp, Activity, Database, Zap } from 'lucide-react';

const DataDashboard = () => {
  const [isRealTime, setIsRealTime] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [selectedMetrics, setSelectedMetrics] = useState({
    cpu: true,
    memory: true,
    network: true,
    disk: true
  });
  const [dashboardLayout, setDashboardLayout] = useState('grid');
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  // Generate realistic time series data
  const generateData = (points = 50) => {
    const now = new Date();
    return Array.from({ length: points }, (_, i) => {
      const time = new Date(now.getTime() - (points - i) * 60000);
      return {
        time: time.toLocaleTimeString(),
        timestamp: time.getTime(),
        cpu: Math.random() * 40 + 30 + Math.sin(i * 0.1) * 10,
        memory: Math.random() * 30 + 50 + Math.cos(i * 0.05) * 5,
        network: Math.random() * 50 + 20 + Math.sin(i * 0.2) * 15,
        disk: Math.random() * 20 + 60 + Math.cos(i * 0.08) * 8,
        requests: Math.floor(Math.random() * 1000) + 500,
        errors: Math.floor(Math.random() * 50) + 10
      };
    });
  };

  // Generate pie chart data
  const generatePieData = () => [
    { name: 'API Calls', value: 35, color: '#3b82f6' },
    { name: 'Database', value: 25, color: '#10b981' },
    { name: 'Frontend', value: 20, color: '#f59e0b' },
    { name: 'Cache', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  // Generate bar chart data
  const generateBarData = () => [
    { name: 'Mon', success: 240, failed: 12 },
    { name: 'Tue', success: 380, failed: 18 },
    { name: 'Wed', success: 320, failed: 8 },
    { name: 'Thu', success: 450, failed: 22 },
    { name: 'Fri', success: 380, failed: 15 },
    { name: 'Sat', success: 290, failed: 9 },
    { name: 'Sun', success: 220, failed: 6 }
  ];

  // Initialize data
  useEffect(() => {
    setData(generateData());
    setPieData(generatePieData());
    setBarData(generateBarData());
  }, []);

  // Real-time data updates with smoother transitions
  useEffect(() => {
    let interval;
    if (isRealTime) {
      interval = setInterval(() => {
        setData(prevData => {
          const newPoint = {
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            cpu: Math.random() * 40 + 30 + Math.sin(Date.now() * 0.001) * 10,
            memory: Math.random() * 30 + 50 + Math.cos(Date.now() * 0.0005) * 5,
            network: Math.random() * 50 + 20 + Math.sin(Date.now() * 0.002) * 15,
            disk: Math.random() * 20 + 60 + Math.cos(Date.now() * 0.0008) * 8,
            requests: Math.floor(Math.random() * 1000) + 500,
            errors: Math.floor(Math.random() * 50) + 10
          };
          // Keep a sliding window of data points
          const newData = [...prevData.slice(-49), newPoint];
          return newData;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRealTime]);

  // Filter data based on selected metrics
  const filteredData = useMemo(() => {
    return data.map(item => {
      const filtered = { time: item.time, timestamp: item.timestamp };
      Object.keys(selectedMetrics).forEach(metric => {
        if (selectedMetrics[metric]) {
          filtered[metric] = item[metric];
        }
      });
      return filtered;
    });
  }, [data, selectedMetrics]);

  // Get latest values for stats
  const latestData = data[data.length - 1] || {};

  const StatCard = ({ title, value, unit, icon: Icon, color, trend }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${trend > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toFixed(1) : value}
        <span className="text-lg text-gray-400 ml-1">{unit}</span>
      </div>
    </div>
  );

  const ChartPanel = ({ title, children, fullWidth = false }) => (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${fullWidth ? 'col-span-full' : ''}`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Activity className="w-4 h-4" />
              <span>Real-time Monitoring</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            >
              <option value="5m">Last 5 minutes</option>
              <option value="1h">Last hour</option>
              <option value="6h">Last 6 hours</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>

            {/* Real-time Toggle */}
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isRealTime 
                  ? 'bg-green-600 border-green-500 text-white' 
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRealTime ? 'Live' : 'Paused'}
            </button>

            {/* Refresh Button */}
            <button 
              onClick={() => setData(generateData())}
              className="p-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className="p-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-6">
          {/* Metric Toggles */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Metrics:</span>
            {Object.entries(selectedMetrics).map(([metric, enabled]) => (
              <button
                key={metric}
                onClick={() => setSelectedMetrics(prev => ({ ...prev, [metric]: !enabled }))}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-sm transition-all ${
                  enabled 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {metric.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Layout:</span>
            <button
              onClick={() => setDashboardLayout(dashboardLayout === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="CPU Usage"
            value={latestData.cpu}
            unit="%"
            icon={Zap}
            color="bg-blue-600"
            trend={2.3}
          />
          <StatCard
            title="Memory Usage"
            value={latestData.memory}
            unit="%"
            icon={Database}
            color="bg-green-600"
            trend={-1.2}
          />
          <StatCard
            title="Network I/O"
            value={latestData.network}
            unit="MB/s"
            icon={Activity}
            color="bg-orange-600"
            trend={5.7}
          />
          <StatCard
            title="Disk Usage"
            value={latestData.disk}
            unit="%"
            icon={BarChart3}
            color="bg-purple-600"
            trend={-0.8}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Main Time Series Chart */}
          <ChartPanel title="System Metrics Over Time" fullWidth>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  animationDuration={150}
                />
                {selectedMetrics.cpu && (
                  <Line 
                    type="monotone" 
                    dataKey="cpu" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    name="CPU %" 
                    dot={false}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                )}
                {selectedMetrics.memory && (
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    name="Memory %" 
                    dot={false}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                )}
                {selectedMetrics.network && (
                  <Line 
                    type="monotone" 
                    dataKey="network" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    name="Network MB/s" 
                    dot={false}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                )}
                {selectedMetrics.disk && (
                  <Line 
                    type="monotone" 
                    dataKey="disk" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    name="Disk %" 
                    dot={false}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resource Distribution */}
          <ChartPanel title="Resource Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={600}
                  animationEasing="ease-out"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  animationDuration={150}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-gray-300">{entry.name}</span>
                  <span className="text-gray-400 ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </ChartPanel>

          {/* Weekly Performance */}
          <ChartPanel title="Weekly Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  animationDuration={150}
                />
                <Bar 
                  dataKey="success" 
                  fill="#10b981" 
                  name="Success" 
                  animationDuration={800}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="failed" 
                  fill="#ef4444" 
                  name="Failed" 
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>

          {/* Network Traffic */}
          <ChartPanel title="Network Traffic">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  animationDuration={150}
                />
                <Area
                  type="monotone"
                  dataKey="network"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Network MB/s"
                  animationDuration={800}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>

        {/* Alert Status */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-900 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-green-300">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-900 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-yellow-300">High CPU Usage</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-gray-300">Maintenance Scheduled</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-900 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-blue-300">Updates Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;