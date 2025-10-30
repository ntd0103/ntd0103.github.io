const posts = [
  {
    id: 1,
    title: "Java Socket cơ bản",
    excerpt: "Giới thiệu khái niệm socket trong Java, ví dụ tạo ServerSocket và Socket client, gửi/nhận chuỗi đơn giản.",
    datetime: "2025-10-10T09:00:00+07:00",
    body: '',
    bodyFile: '/posts/1.md',
  },
  {
    id: 2,
    title: "HTTP Request trong Java (HttpURLConnection & HttpClient)",
    excerpt: "So sánh cách gửi HTTP request bằng HttpURLConnection và HttpClient, kèm ví dụ GET/POST.",
    datetime: "2025-10-12T14:30:00+07:00",
    body: '',
    bodyFile: '/posts/2.md',
  },
  {
    id: 3,
    title: "REST API với Spring Boot",
    excerpt: "Xây dựng RESTful API nhỏ: Controller, Service, Repository, và cách test bằng Postman.",
    datetime: "2025-10-14T10:00:00+07:00",
    body: '',
    bodyFile: '/posts/1.md',

  },
  {
    id: 4,
    title: "Fetch API trong JavaScript",
    excerpt: "Sử dụng fetch để gọi REST API, xử lý JSON, và bắt lỗi; ví dụ thực tế với async/await.",
    datetime: "2025-10-15T08:45:00+07:00",
    body: '',
    bodyFile: '/posts/2.md',

  },
  {
    id: 5,
    title: "WebSocket trong JS: Chat thời gian thực",
    excerpt: "Triển khai client WebSocket đơn giản, gửi/nhận tin nhắn và xử lý reconnect.",
    datetime: "2025-10-16T11:20:00+07:00",
    body: '',
    bodyFile: '/posts/3.md',

  },
  {
    id: 6,
    title: "So sánh Java & JavaScript trong mạng",
    excerpt: "Điểm mạnh/điểm yếu khi làm network programming: thread vs event loop, thư viện phổ biến.",
    datetime: "2025-10-17T09:00:00+07:00",
    body: '',
    bodyFile: '/posts/4.md',

  },
  {
    id: 7,
    title: "JSON và truyền dữ liệu trong lập trình mạng",
    excerpt: "Cách serialize/deserialize JSON trong Java và JS, định dạng hợp lệ, và thủ thuật an toàn.",
    datetime: "2025-10-18T15:00:00+07:00",
    body: '',
    bodyFile: '/posts/5.md',

  },
  {
    id: 8,
    title: "MQTT cho IoT: Từ lý thuyết tới demo",
    excerpt: "Giới thiệu MQTT, thiết lập Mosquitto broker, publish/subscribe bằng Python/JS.",
    datetime: "2025-10-19T10:30:00+07:00",
    body: `## 📌 Giới thiệu
MQTT (Message Queuing Telemetry Transport) là protocol nhẹ, được thiết kế đặc biệt cho IoT devices với băng thông thấp và kết nối không ổn định. Nó hoàn hảo cho smart home, sensors, và industrial IoT.

## 🎯 Mục tiêu học
- Hiểu kiến trúc MQTT: Broker, Publisher, Subscriber
- Nắm khái niệm Topic, QoS, Retained Messages
- Cài đặt và cấu hình Mosquitto broker
- Implement client với Python và JavaScript

## 🔧 Hướng dẫn thực hiện

### Bước 1: Cài đặt Mosquitto Broker

**Windows:**
\`\`\`bash
# Download từ: https://mosquitto.org/download/
# Sau khi cài, chạy service
net start mosquitto
\`\`\`

**Linux/Mac:**
\`\`\`bash
# Ubuntu/Debian
sudo apt-get install mosquitto mosquitto-clients

# macOS
brew install mosquitto

# Start service
mosquitto -v
\`\`\`

### Bước 2: Test với Command Line

\`\`\`bash
# Terminal 1: Subscribe to topic
mosquitto_sub -h localhost -t sensors/temperature

# Terminal 2: Publish message
mosquitto_pub -h localhost -t sensors/temperature -m "25.5"
\`\`\`

### Bước 3: Python Client (paho-mqtt)

**Cài đặt**
\`\`\`bash
pip install paho-mqtt
\`\`\`

**Publisher (gửi dữ liệu sensor)**
\`\`\`python
import paho.mqtt.client as mqtt
import time
import random

# Callback khi connect thành công
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print(f"Failed to connect, return code {rc}")

# Tạo client
client = mqtt.Client("TemperatureSensor")
client.on_connect = on_connect

# Connect tới broker
client.connect("localhost", 1883, 60)
client.loop_start()

# Publish data mỗi 5 giây
try:
    while True:
        temperature = round(random.uniform(20.0, 30.0), 2)
        humidity = round(random.uniform(40.0, 60.0), 2)
        
        # Publish với QoS 1
        client.publish("sensors/temperature", temperature, qos=1)
        client.publish("sensors/humidity", humidity, qos=1)
        
        print(f"Published: Temp={temperature}°C, Humidity={humidity}%")
        time.sleep(5)
except KeyboardInterrupt:
    client.loop_stop()
    client.disconnect()
\`\`\`

**Subscriber (nhận dữ liệu)**
\`\`\`python
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Subscribe khi connect thành công
    client.subscribe("sensors/#")  # # = wildcard, nhận tất cả subtopics

def on_message(client, userdata, msg):
    print(f"Topic: {msg.topic}")
    print(f"Message: {msg.payload.decode()}")
    print(f"QoS: {msg.qos}")
    print("---")

client = mqtt.Client("DataLogger")
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

# Blocking call - chạy forever
client.loop_forever()
\`\`\`

### Bước 4: JavaScript/Node.js Client

**Cài đặt**
\`\`\`bash
npm install mqtt
\`\`\`

**Publisher & Subscriber**
\`\`\`javascript
const mqtt = require('mqtt');

// Connect tới broker
const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'WebClient',
  clean: true,
  connectTimeout: 4000
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe topics
  client.subscribe('sensors/#', (err) => {
    if (!err) {
      console.log('Subscribed to sensors/*');
    }
  });
  
  // Publish test message
  setInterval(() => {
    const temp = (Math.random() * 10 + 20).toFixed(2);
    client.publish('sensors/temperature', temp, { qos: 1 });
    console.log(\`Published: \${temp}°C\`);
  }, 10000);
});

client.on('message', (topic, message) => {
  console.log(\`[\${topic}] \${message.toString()}\`);
  
  // Parse và xử lý data
  if (topic === 'sensors/temperature') {
    const temp = parseFloat(message.toString());
    if (temp > 28) {
      console.log('⚠️ Temperature alert!');
    }
  }
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});
\`\`\`

### Bước 5: MQTT over WebSocket (Browser)

\`\`\`javascript
// Sử dụng CDN hoặc bundle với webpack
// <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>

const client = mqtt.connect('ws://localhost:8080', {
  clientId: 'BrowserClient_' + Math.random().toString(16).substr(2, 8)
});

client.on('connect', () => {
  console.log('Connected via WebSocket');
  client.subscribe('sensors/temperature');
});

client.on('message', (topic, message) => {
  // Update UI
  document.getElementById('temperature').textContent = message.toString();
});
\`\`\`

## 📊 MQTT Concepts

### QoS (Quality of Service) Levels

| QoS | Tên | Mô tả | Use case |
|-----|-----|-------|----------|
| 0 | At most once | Fire and forget | Logging, non-critical data |
| 1 | At least once | Acknowledged delivery | Most common, sensor data |
| 2 | Exactly once | Guaranteed delivery | Financial, critical commands |

### Topic Structure
\`\`\`
home/livingroom/temperature
home/bedroom/humidity
factory/machine1/status
factory/machine1/alerts
\`\`\`

**Wildcards:**
- \`+\`: Single level wildcard (\`sensors/+/temperature\`)
- \`#\`: Multi level wildcard (\`sensors/#\`)

## 💡 Best Practices

**1. Topic naming convention**
- Dùng lowercase
- Phân cấp rõ ràng: location/device/measurement
- Tránh spaces và ký tự đặc biệt

**2. Security**
\`\`\`bash
# Cấu hình authentication trong mosquitto.conf
allow_anonymous false
password_file /etc/mosquitto/passwd

# Tạo user
mosquitto_passwd -c /etc/mosquitto/passwd username
\`\`\`

**3. Retained messages cho trạng thái**
\`\`\`python
# Publish với retained=True
client.publish("device/status", "online", retain=True)
# Client mới subscribe sẽ nhận được message này ngay lập tức
\`\`\`

## 🎓 Kết luận
MQTT là protocol hoàn hảo cho IoT với bandwidth thấp, battery-powered devices, và unreliable networks. Mosquitto broker dễ setup và paho client libraries hỗ trợ đa nền tảng.

**Key features**:
- Lightweight protocol, minimal overhead
- Publish/Subscribe pattern (decoupling)
- QoS levels cho reliability
- Retained messages và Last Will & Testament

**Bài tập thực hành**:
1. Xây dựng hệ thống giám sát nhiệt độ phòng với ESP8266/Arduino
2. Tạo dashboard web realtime hiển thị sensor data
3. Implement alerting system khi giá trị vượt ngưỡng
4. Deploy MQTT broker lên cloud (CloudMQTT, HiveMQ)`
  },
  {
    id: 9,
    title: "Ứng dụng thực tế: Giám sát cảm biến qua WebSocket",
    excerpt: "Case study: thu thập dữ liệu cảm biến, stream qua WebSocket và hiển thị dashboard.",
    datetime: "2025-10-20T13:10:00+07:00",
    body: `## 📌 Giới thiệu
Bài này là case study thực tế về việc xây dựng hệ thống giám sát cảm biến realtime, từ hardware đến dashboard web. Bạn sẽ học cách thiết kế kiến trúc, xử lý data streaming, và visualization.

## 🎯 Mục tiêu học
- Thiết kế kiến trúc IoT end-to-end
- Thu thập và stream data từ sensors
- Xử lý data pipeline với WebSocket
- Hiển thị realtime dashboard với charts

## 🏗️ Kiến trúc hệ thống

\`\`\`
[Sensors] → [Gateway/MCU] → [WebSocket Server] → [Web Dashboard]
                              ↓
                         [Database] (logging)
\`\`\`

## 🔧 Hướng dẫn thực hiện

### Bước 1: Sensor Data Generator (giả lập)

\`\`\`javascript
// sensor-simulator.js
const WebSocket = require('ws');

class SensorSimulator {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.sensors = [
      { id: 'TEMP_01', type: 'temperature', min: 20, max: 30 },
      { id: 'HUM_01', type: 'humidity', min: 40, max: 70 },
      { id: 'PRES_01', type: 'pressure', min: 990, max: 1020 }
    ];
  }
  
  start() {
    this.ws.on('open', () => {
      console.log('Connected to server');
      this.sendData();
    });
  }
  
  sendData() {
    setInterval(() => {
      this.sensors.forEach(sensor => {
        const value = this.generateValue(sensor.min, sensor.max);
        const data = {
          sensorId: sensor.id,
          type: sensor.type,
          value: value,
          unit: this.getUnit(sensor.type),
          timestamp: new Date().toISOString()
        };
        
        this.ws.send(JSON.stringify(data));
        console.log(\`Sent: \${sensor.id} = \${value}\`);
      });
    }, 2000); // Mỗi 2 giây
  }
  
  generateValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
  
  getUnit(type) {
    const units = {
      temperature: '°C',
      humidity: '%',
      pressure: 'hPa'
    };
    return units[type] || '';
  }
}

const simulator = new SensorSimulator('ws://localhost:8080');
simulator.start();
\`\`\`

### Bước 2: WebSocket Server với Data Processing

\`\`\`javascript
// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store latest readings
const latestData = new Map();
const clients = new Set();

// Data smoothing (moving average)
class DataSmoother {
  constructor(windowSize = 5) {
    this.window = [];
    this.windowSize = windowSize;
  }
  
  smooth(value) {
    this.window.push(parseFloat(value));
    if (this.window.length > this.windowSize) {
      this.window.shift();
    }
    const sum = this.window.reduce((a, b) => a + b, 0);
    return (sum / this.window.length).toFixed(2);
  }
}

const smoothers = new Map();

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);
  
  // Gửi latest data cho client mới
  ws.send(JSON.stringify({
    type: 'init',
    data: Array.from(latestData.values())
  }));
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Apply smoothing
      if (!smoothers.has(data.sensorId)) {
        smoothers.set(data.sensorId, new DataSmoother());
      }
      const smoothed = smoothers.get(data.sensorId).smooth(data.value);
      
      // Add smoothed value
      data.smoothedValue = smoothed;
      
      // Check thresholds
      data.alert = checkThreshold(data);
      
      // Store latest
      latestData.set(data.sensorId, data);
      
      // Broadcast tới tất cả clients
      const broadcast = JSON.stringify({
        type: 'update',
        data: data
      });
      
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcast);
        }
      });
      
      // Log to database (implementation tùy bạn)
      // saveToDatabase(data);
      
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

function checkThreshold(data) {
  const thresholds = {
    temperature: { min: 18, max: 28 },
    humidity: { min: 30, max: 70 },
    pressure: { min: 995, max: 1015 }
  };
  
  const threshold = thresholds[data.type];
  if (!threshold) return false;
  
  const value = parseFloat(data.value);
  return value < threshold.min || value > threshold.max;
}

console.log('WebSocket server running on ws://localhost:8080');
\`\`\`

### Bước 3: React Dashboard với Real-time Charts

\`\`\`javascript
import React, { useState, useEffect, useRef } from 'react';

function SensorDashboard() {
  const [sensors, setSensors] = useState({});
  const [history, setHistory] = useState({});
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  
  useEffect(() => {
    // Connect WebSocket
    ws.current = new WebSocket('ws://localhost:8080');
    
    ws.current.onopen = () => {
      setConnected(true);
      console.log('Dashboard connected');
    };
    
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'init') {
        // Initialize với latest data
        const initial = {};
        message.data.forEach(sensor => {
          initial[sensor.sensorId] = sensor;
        });
        setSensors(initial);
      } else if (message.type === 'update') {
        const data = message.data;
        
        // Update sensor state
        setSensors(prev => ({
          ...prev,
          [data.sensorId]: data
        }));
        
        // Update history cho chart
        setHistory(prev => {
          const sensorHistory = prev[data.sensorId] || [];
          return {
            ...prev,
            [data.sensorId]: [
              ...sensorHistory.slice(-20), // Giữ 20 điểm cuối
              {
                timestamp: data.timestamp,
                value: parseFloat(data.smoothedValue)
              }
            ]
          };
        });
      }
    };
    
    ws.current.onclose = () => {
      setConnected(false);
      console.log('Disconnected');
    };
    
    return () => ws.current?.close();
  }, []);
  
  return (
    <div className="dashboard">
      <h1>Sensor Dashboard</h1>
      <div className="status">
        {connected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
      
      <div className="sensors-grid">
        {Object.values(sensors).map(sensor => (
          <SensorCard 
            key={sensor.sensorId} 
            sensor={sensor}
            history={history[sensor.sensorId] || []}
          />
        ))}
      </div>
    </div>
  );
}

function SensorCard({ sensor, history }) {
  return (
    <div className={\`sensor-card \${sensor.alert ? 'alert' : ''}\`}>
      <h3>{sensor.sensorId}</h3>
      <div className="value">
        <span className="number">{sensor.smoothedValue}</span>
        <span className="unit">{sensor.unit}</span>
      </div>
      {sensor.alert && (
        <div className="alert-badge">⚠️ Threshold exceeded!</div>
      )}
      <MiniChart data={history} />
    </div>
  );
}

function MiniChart({ data }) {
  if (data.length === 0) return null;
  
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  
  return (
    <svg width="100%" height="60" className="mini-chart">
      <polyline
        points={data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 60 - ((d.value - min) / (max - min)) * 50;
          return \`\${x},\${y}\`;
        }).join(' ')}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />
    </svg>
  );
}

export default SensorDashboard;
\`\`\`

## 💡 Optimization Techniques

**1. Data throttling**
\`\`\`javascript
let lastSent = 0;
const THROTTLE_MS = 1000;

if (Date.now() - lastSent > THROTTLE_MS) {
  ws.send(data);
  lastSent = Date.now();
}
\`\`\`

**2. Compression**
\`\`\`javascript
// Gửi delta thay vì full data
const delta = {
  id: sensor.id,
  v: value, // shortened keys
  t: Date.now()
};
\`\`\`

**3. Buffering**
\`\`\`javascript
// Buffer data và gửi batch
const buffer = [];
setInterval(() => {
  if (buffer.length > 0) {
    ws.send(JSON.stringify(buffer));
    buffer.length = 0;
  }
}, 5000);
\`\`\`

## 🎓 Kết luận
Bạn đã xây dựng được một hệ thống IoT realtime hoàn chỉnh với data pipeline, processing, và visualization. Đây là nền tảng để scale lên các hệ thống production với thousands of sensors.

**Key components**:
- WebSocket cho bidirectional realtime communication
- Data smoothing để giảm noise
- Threshold alerting cho monitoring
- Realtime charts cho visualization

**Bài tập nâng cao**:
1. Thêm database (InfluxDB/TimescaleDB) để lưu time series
2. Implement data aggregation (minute/hour averages)
3. Thêm user authentication và multi-tenancy
4. Deploy lên cloud với auto-scaling`
  },
  {
    id: 10,
    title: "Practical Tips: Debugging & Best Practices cho network code",
    excerpt: "Log, retry strategy, timeout handling và cách viết test cho code mạng.",
    datetime: "2025-10-21T16:00:00+07:00",
    body: `## 📌 Giới thiệu
Lập trình mạng luôn đầy thử thách: connections drop, timeouts, network partitions... Bài này tổng hợp các best practices và debugging techniques để code của bạn robust và maintainable.

## 🎯 Mục tiêu học
- Implement proper error handling và logging
- Retry strategies với exponential backoff
- Timeout management và circuit breaker pattern
- Testing network code với mocks và integration tests

## 🔧 Best Practices

### 1. Proper Logging

**Structured logging (JavaScript)**
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('Connection established', {
  clientId: 'ABC123',
  ip: '192.168.1.100',
  timestamp: new Date()
});

logger.error('Connection failed', {
  error: err.message,
  stack: err.stack,
  clientId: 'ABC123'
});
\`\`\`

**Java logging (SLF4J + Logback)**
\`\`\`java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NetworkService {
  private static final Logger logger = LoggerFactory.getLogger(NetworkService.class);
  
  public void connect(String host, int port) {
    logger.info("Attempting connection to {}:{}", host, port);
    try {
      // Connection logic
      logger.info("Connection successful");
    } catch (IOException e) {
      logger.error("Connection failed: {}", e.getMessage(), e);
      throw new ConnectionException("Cannot connect", e);
    }
  }
}
\`\`\`

### 2. Retry Strategy với Exponential Backoff

\`\`\`javascript
class RetryStrategy {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.factor = options.factor || 2;
  }
  
  async execute(fn, context = 'operation') {
    let lastError;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await fn();
        
        if (attempt > 0) {
          console.log(\`\${context} succeeded after \${attempt} retries\`);
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        if (attempt === this.maxRetries) {
          console.error(\`\${context} failed after \${this.maxRetries} retries\`);
          throw error;
        }
        
        const delay = Math.min(
          this.baseDelay * Math.pow(this.factor, attempt),
          this.maxDelay
        );
        
        console.warn(
          \`\${context} failed (attempt \${attempt + 1}), \\
          retrying in \${delay}ms...\`,
          error.message
        );
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
}

// Usage
const retry = new RetryStrategy({ 
  maxRetries: 5,
  baseDelay: 1000,
  factor: 2
});

await retry.execute(async () => {
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return await response.json();
}, 'API fetch');
\`\`\`

### 3. Timeout Management

\`\`\`javascript
// Wrapper với timeout
function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

// Usage
try {
  const data = await withTimeout(
    fetch('https://slow-api.com/data'),
    5000 // 5 seconds
  );
} catch (error) {
  if (error.message === 'Timeout') {
    console.error('Request timed out');
  }
}

// Với AbortController (modern approach)
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
\`\`\`

### 4. Circuit Breaker Pattern

\`\`\`javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.nextAttempt = Date.now();
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
      console.warn(\`Circuit breaker opened, retry after \${this.resetTimeout}ms\`);
    }
  }
  
  getState() {
    return this.state;
  }
}

// Usage
const breaker = new CircuitBreaker({
  failureThreshold: 3,
  resetTimeout: 30000
});

async function callAPI() {
  try {
    return await breaker.execute(async () => {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    });
  } catch (error) {
    console.error('Request failed:', error.message);
    return null;
  }
}
\`\`\`

### 5. Testing Network Code

**Mock HTTP requests (Jest + node-fetch)**
\`\`\`javascript
// api.test.js
const fetch = require('node-fetch');
jest.mock('node-fetch');

describe('API Client', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  
  test('successful fetch', async () => {
    const mockData = { id: 1, name: 'Test' };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    });
    
    const result = await fetchUser(1);
    
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
    expect(result).toEqual(mockData);
  });
  
  test('handles network error', async () => {
    fetch.mockRejectedValue(new Error('Network error'));
    
    await expect(fetchUser(1)).rejects.toThrow('Network error');
  });
  
  test('handles HTTP error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404
    });
    
    await expect(fetchUser(999)).rejects.toThrow();
  });
});
\`\`\`

**Integration test với test server**
\`\`\`javascript
const express = require('express');

describe('Integration tests', () => {
  let server;
  let port;
  
  beforeAll((done) => {
    const app = express();
    app.get('/test', (req, res) => {
      res.json({ message: 'OK' });
    });
    
    server = app.listen(0, () => {
      port = server.address().port;
      done();
    });
  });
  
  afterAll((done) => {
    server.close(done);
  });
  
  test('real HTTP request', async () => {
    const response = await fetch(\`http://localhost:\${port}/test\`);
    const data = await response.json();
    
    expect(data.message).toBe('OK');
  });
});
\`\`\`

## 🐛 Debugging Tools

### 1. Network inspection
\`\`\`bash
# tcpdump - capture packets
sudo tcpdump -i any port 8080 -w capture.pcap

# netstat - active connections
netstat -an | grep 8080

# curl với verbose
curl -v https://api.example.com/data
\`\`\`

### 2. WebSocket debugging
\`\`\`javascript
const ws = new WebSocket('ws://localhost:8080');

// Log all events
ws.addEventListener('open', () => console.log('WS: OPEN'));
ws.addEventListener('close', (e) => console.log('WS: CLOSE', e.code, e.reason));
ws.addEventListener('error', (e) => console.error('WS: ERROR', e));
ws.addEventListener('message', (e) => console.log('WS: MESSAGE', e.data));
\`\`\`

### 3. Connection pooling monitoring
\`\`\`java
// HikariCP metrics
HikariDataSource ds = new HikariDataSource();
ds.setMetricRegistry(new MetricRegistry());

// Log pool stats
logger.info("Active connections: {}", ds.getHikariPoolMXBean().getActiveConnections());
logger.info("Idle connections: {}", ds.getHikariPoolMXBean().getIdleConnections());
\`\`\`

## 💡 Performance Tips

**1. Connection reuse**
\`\`\`javascript
// ❌ Bad: Tạo connection mới mỗi request
async function badFetch() {
  const http = require('http');
  const agent = new http.Agent();
  return fetch(url, { agent });
}

// ✅ Good: Reuse connection pool
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 50
});

async function goodFetch() {
  return fetch(url, { agent });
}
\`\`\`

**2. Batch requests**
\`\`\`javascript
// Thay vì 100 requests riêng lẻ
const users = await Promise.all(
  ids.map(id => fetch(\`/users/\${id}\`))
);

// Gửi 1 batch request
const users = await fetch('/users/batch', {
  method: 'POST',
  body: JSON.stringify({ ids })
});
\`\`\`

## 🎓 Kết luận
Network programming đòi hỏi xử lý nhiều edge cases. Với proper logging, retry logic, timeouts, và testing, code của bạn sẽ resilient và production-ready.

**Checklist cho production code**:
- ✅ Structured logging với correlation IDs
- ✅ Exponential backoff cho retries
- ✅ Timeouts cho tất cả network calls
- ✅ Circuit breaker cho external dependencies
- ✅ Comprehensive error handling
- ✅ Unit và integration tests
- ✅ Monitoring và alerting
- ✅ Connection pooling và reuse

**Bài tập thực hành**: Tạo một network utility library với tất cả patterns trên, publish lên npm/Maven, và sử dụng trong real project của bạn!`
  }
];

export default posts;
