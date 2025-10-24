const posts = [
  {
    id: 1,
    title: "Java Socket cơ bản",
    excerpt: "Giới thiệu khái niệm socket trong Java, ví dụ tạo ServerSocket và Socket client, gửi/nhận chuỗi đơn giản.",
    datetime: "2025-10-10T09:00:00+07:00",
    body: `## 📌 Giới thiệu
Socket là nền tảng của lập trình mạng trong Java. Nó cung cấp cơ chế giao tiếp hai chiều giữa client và server thông qua TCP/IP. Trong bài này, mình sẽ hướng dẫn các bạn xây dựng một hệ thống Echo đơn giản để hiểu rõ cách Socket hoạt động.

## 🎯 Mục tiêu học
- Hiểu khái niệm Socket và ServerSocket trong Java
- Tạo server lắng nghe kết nối trên một cổng cụ thể
- Xây dựng client kết nối và trao đổi dữ liệu với server
- Xử lý luồng dữ liệu vào/ra (InputStream/OutputStream)

## 🔧 Hướng dẫn thực hiện

### Bước 1: Tạo Server
Server sẽ lắng nghe trên cổng 5000 và chờ kết nối từ client:

\`\`\`java
import java.net.*;
import java.io.*;

public class EchoServer {
  public static void main(String[] args) {
    try {
      // Bước 1: Tạo ServerSocket lắng nghe trên cổng 5000
      ServerSocket server = new ServerSocket(5000);
      System.out.println("Server đang chờ kết nối...");
      
      // Bước 2: Chấp nhận kết nối từ client
      Socket client = server.accept();
      System.out.println("Client đã kết nối: " + client.getInetAddress());
      
      // Bước 3: Tạo luồng đọc/ghi
      BufferedReader in = new BufferedReader(
        new InputStreamReader(client.getInputStream())
      );
      PrintWriter out = new PrintWriter(client.getOutputStream(), true);
      
      // Bước 4: Đọc dữ liệu và phản hồi
      String line = in.readLine();
      System.out.println("Server nhận: " + line);
      out.println("Echo: " + line);
      
      // Bước 5: Đóng kết nối
      client.close();
      server.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
\`\`\`

### Bước 2: Tạo Client
Client sẽ kết nối tới server và gửi tin nhắn:

\`\`\`java
import java.net.*;
import java.io.*;

public class SimpleClient {
  public static void main(String[] args) {
    try {
      // Bước 1: Kết nối tới server
      Socket socket = new Socket("localhost", 5000);
      System.out.println("Đã kết nối tới server!");
      
      // Bước 2: Tạo luồng ghi/đọc
      PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
      BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream())
      );
      
      // Bước 3: Gửi tin nhắn
      out.println("Hello Server");
      
      // Bước 4: Nhận phản hồi
      String response = in.readLine();
      System.out.println("Phản hồi từ server: " + response);
      
      // Bước 5: Đóng kết nối
      socket.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
\`\`\`

### Bước 3: Chạy thử nghiệm
1. Mở 2 terminal/command prompt
2. Chạy Server trước: \`java EchoServer\`
3. Chạy Client: \`java SimpleClient\`
4. Quan sát kết quả trên cả hai terminal

## 💡 Kiến thức bổ sung
- **ServerSocket.accept()**: Phương thức này sẽ block (chờ) cho đến khi có client kết nối
- **BufferedReader/PrintWriter**: Giúp đọc/ghi dữ liệu văn bản dễ dàng hơn
- **Port number**: Nên chọn port > 1024 để tránh xung đột với system ports

## 🎓 Kết luận
Qua bài học này, bạn đã nắm được:
- Cách tạo server socket để lắng nghe kết nối
- Cách client kết nối và trao đổi dữ liệu
- Cơ chế blocking I/O trong Java Socket

**Bài tập thực hành**: Thử mở rộng chương trình để server có thể xử lý nhiều client cùng lúc bằng cách sử dụng Thread hoặc ExecutorService. Đây sẽ là nền tảng để xây dựng các ứng dụng chat hoặc game server thực tế!`
  },
  {
    id: 2,
    title: "HTTP Request trong Java (HttpURLConnection & HttpClient)",
    excerpt: "So sánh cách gửi HTTP request bằng HttpURLConnection và HttpClient, kèm ví dụ GET/POST.",
    datetime: "2025-10-12T14:30:00+07:00",
    body: `## 📌 Giới thiệu
Trong thực tế, việc gọi REST API từ ứng dụng Java là rất phổ biến. Java cung cấp hai cách chính: **HttpURLConnection** (có từ JDK 1.1) và **HttpClient** (từ Java 11+). Bài này sẽ so sánh cả hai phương pháp và giúp bạn chọn công cụ phù hợp.

## 🎯 Mục tiêu học
- Hiểu sự khác biệt giữa HttpURLConnection và HttpClient
- Gửi GET request để lấy dữ liệu
- Gửi POST request với JSON body
- Xử lý response code và parse dữ liệu trả về

## 🔧 Hướng dẫn thực hiện

### Phương pháp 1: HttpClient (Java 11+) - Khuyên dùng

**Ưu điểm**: API hiện đại, dễ đọc, hỗ trợ async

\`\`\`java
import java.net.http.*;
import java.net.*;

public class HttpClientExample {
  public static void main(String[] args) throws Exception {
    // Bước 1: Tạo HttpClient instance
    HttpClient client = HttpClient.newHttpClient();
    
    // Bước 2: Tạo request GET
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://jsonplaceholder.typicode.com/posts/1"))
      .header("Accept", "application/json")
      .GET()
      .build();
    
    // Bước 3: Gửi request và nhận response
    HttpResponse<String> response = client.send(
      request, 
      HttpResponse.BodyHandlers.ofString()
    );
    
    // Bước 4: Xử lý response
    System.out.println("Status Code: " + response.statusCode());
    System.out.println("Response Body: " + response.body());
  }
}
\`\`\`

### Phương pháp 2: HttpURLConnection - Phương pháp cổ điển

**Ưu điểm**: Có sẵn từ Java cũ, không cần dependency

\`\`\`java
import java.net.*;
import java.io.*;

public class HttpURLExample {
  public static void main(String[] args) throws Exception {
    // Bước 1: Tạo URL và mở connection
    URL url = new URL("https://jsonplaceholder.typicode.com/posts/1");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    
    // Bước 2: Cấu hình request
    conn.setRequestMethod("GET");
    conn.setRequestProperty("Accept", "application/json");
    
    // Bước 3: Đọc response
    int statusCode = conn.getResponseCode();
    BufferedReader in = new BufferedReader(
      new InputStreamReader(conn.getInputStream())
    );
    
    String line;
    StringBuilder response = new StringBuilder();
    while ((line = in.readLine()) != null) {
      response.append(line);
    }
    in.close();
    
    System.out.println("Status: " + statusCode);
    System.out.println("Body: " + response.toString());
  }
}
\`\`\`

### Gửi POST Request với JSON

\`\`\`java
public static void postExample() throws Exception {
  HttpClient client = HttpClient.newHttpClient();
  
  // Tạo JSON body
  String jsonBody = """
    {
      "title": "Bài viết mới",
      "body": "Nội dung bài viết",
      "userId": 1
    }
  """;
  
  HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://jsonplaceholder.typicode.com/posts"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
    .build();
  
  HttpResponse<String> response = client.send(
    request, 
    HttpResponse.BodyHandlers.ofString()
  );
  
  System.out.println("Created: " + response.body());
}
\`\`\`

## 📊 So sánh HttpClient vs HttpURLConnection

| Tiêu chí | HttpClient | HttpURLConnection |
|----------|------------|-------------------|
| Java version | 11+ | 1.1+ |
| API design | Modern, fluent | Cũ, verbose |
| Async support | ✅ Có | ❌ Không |
| HTTP/2 | ✅ Có | ❌ Không |
| Dễ sử dụng | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 💡 Tips & Best Practices
1. **Timeout**: Luôn set timeout để tránh block vô thời hạn
2. **Connection pooling**: HttpClient tự động quản lý connection pool
3. **Error handling**: Bắt IOException và kiểm tra status code
4. **Security**: Với HTTPS, validate certificate đúng cách

## 🎓 Kết luận
**Khuyến nghị**: Nếu dự án của bạn dùng Java 11+, hãy chọn **HttpClient** vì API hiện đại và dễ maintain hơn. Chỉ dùng HttpURLConnection khi bắt buộc support Java 8 trở xuống.

**Bài tập thực hành**: Tạo một class HTTPHelper với các method get(), post(), put(), delete() sử dụng HttpClient, kèm retry logic và logging để tái sử dụng trong các dự án thực tế.`
  },
  {
    id: 3,
    title: "REST API với Spring Boot",
    excerpt: "Xây dựng RESTful API nhỏ: Controller, Service, Repository, và cách test bằng Postman.",
    datetime: "2025-10-14T10:00:00+07:00",
    body: `## 📌 Giới thiệu
Spring Boot là framework phổ biến nhất để xây dựng REST API trong Java. Với cơ chế auto-configuration và dependency injection mạnh mẽ, bạn có thể tạo một API hoàn chỉnh chỉ trong vài phút. Bài này sẽ hướng dẫn chi tiết từ khởi tạo project đến test API.

## 🎯 Mục tiêu học
- Tạo Spring Boot project với Spring Initializr
- Hiểu kiến trúc 3 lớp: Controller - Service - Repository
- Xây dựng CRUD operations cho REST API
- Test API với Postman và curl

## 🔧 Hướng dẫn thực hiện

### Bước 1: Khởi tạo project
Truy cập https://start.spring.io và chọn:
- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.2.x
- **Dependencies**: Spring Web, Spring Data JPA, H2 Database

### Bước 2: Tạo Entity

\`\`\`java
import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String title;
  
  @Column(length = 1000)
  private String content;
  
  // Constructors, Getters, Setters
  public Post() {}
  
  public Post(String title, String content) {
    this.title = title;
    this.content = content;
  }
  
  // ... getters/setters ...
}
\`\`\`

### Bước 3: Tạo Repository

\`\`\`java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  // Spring Data JPA tự động tạo các method:
  // findAll(), findById(), save(), deleteById(), etc.
}
\`\`\`

### Bước 4: Tạo Service Layer

\`\`\`java
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {
  private final PostRepository repository;
  
  public PostService(PostRepository repository) {
    this.repository = repository;
  }
  
  public List<Post> listAll() {
    return repository.findAll();
  }
  
  public Post create(Post post) {
    return repository.save(post);
  }
  
  public Post getById(Long id) {
    return repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Post not found"));
  }
  
  public void delete(Long id) {
    repository.deleteById(id);
  }
}
\`\`\`

### Bước 5: Tạo Controller (API Endpoints)

\`\`\`java
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
  private final PostService service;
  
  public PostController(PostService service) {
    this.service = service;
  }
  
  // GET /api/posts - Lấy tất cả posts
  @GetMapping
  public List<Post> getAllPosts() {
    return service.listAll();
  }
  
  // GET /api/posts/{id} - Lấy post theo ID
  @GetMapping("/{id}")
  public ResponseEntity<Post> getPost(@PathVariable Long id) {
    Post post = service.getById(id);
    return ResponseEntity.ok(post);
  }
  
  // POST /api/posts - Tạo post mới
  @PostMapping
  public ResponseEntity<Post> createPost(@RequestBody Post post) {
    Post created = service.create(post);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
  
  // DELETE /api/posts/{id} - Xóa post
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }
}
\`\`\`

### Bước 6: Test API với curl

\`\`\`bash
# Tạo post mới
curl -X POST http://localhost:8080/api/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Bài viết đầu tiên","content":"Nội dung demo"}'

# Lấy tất cả posts
curl http://localhost:8080/api/posts

# Lấy post theo ID
curl http://localhost:8080/api/posts/1

# Xóa post
curl -X DELETE http://localhost:8080/api/posts/1
\`\`\`

## 📊 Kiến trúc 3 lớp

**Controller** → **Service** → **Repository** → **Database**

- **Controller**: Xử lý HTTP requests, validation, response
- **Service**: Business logic, transaction management
- **Repository**: Data access, query database

## 💡 Tips & Best Practices
1. **Exception Handling**: Tạo @ControllerAdvice để xử lý lỗi global
2. **Validation**: Dùng @Valid và Bean Validation (@NotNull, @Size, etc.)
3. **DTO Pattern**: Tách Entity và DTO để kiểm soát dữ liệu response
4. **Pagination**: Dùng Pageable cho list API khi có nhiều dữ liệu
5. **API Documentation**: Thêm Swagger/OpenAPI để tạo docs tự động

## 🎓 Kết luận
Bạn đã học được cách xây dựng một REST API hoàn chỉnh với Spring Boot, từ thiết kế kiến trúc đến implementation và testing. Đây là nền tảng để phát triển các ứng dụng backend phức tạp hơn.

**Bài tập nâng cao**: 
1. Thêm authentication với Spring Security và JWT
2. Implement pagination và sorting cho GET /api/posts
3. Thêm search API với query parameters
4. Deploy lên cloud platform (Heroku, Railway, hoặc AWS)`
  },
  {
    id: 4,
    title: "Fetch API trong JavaScript",
    excerpt: "Sử dụng fetch để gọi REST API, xử lý JSON, và bắt lỗi; ví dụ thực tế với async/await.",
    datetime: "2025-10-15T08:45:00+07:00",
    body: `## 📌 Giới thiệu
Fetch API là cách hiện đại để thực hiện HTTP requests trong JavaScript, thay thế cho XMLHttpRequest cũ kỹ. Với cú pháp promise-based và async/await, code trở nên dễ đọc và maintain hơn rất nhiều.

## 🎯 Mục tiêu học
- Hiểu cách sử dụng Fetch API với Promise và async/await
- Gửi GET/POST/PUT/DELETE requests
- Xử lý JSON response và error handling
- Áp dụng trong React component

## 🔧 Hướng dẫn thực hiện

### Bước 1: GET Request cơ bản

\`\`\`javascript
// Cách 1: Dùng .then()
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Cách 2: Dùng async/await (khuyên dùng)
async function getPost() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
\`\`\`

### Bước 2: POST Request với JSON

\`\`\`javascript
async function createPost(postData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Thêm token nếu cần authentication
        // 'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Post created:', data);
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Sử dụng
createPost({
  title: 'Bài viết mới',
  body: 'Nội dung bài viết',
  userId: 1
});
\`\`\`

### Bước 3: Tích hợp vào React Component

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Lấy 10 posts đầu
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Bước 4: Tạo API Helper reusable

\`\`\`javascript
// api.js - Helper functions
const API_BASE = 'https://jsonplaceholder.typicode.com';

async function apiRequest(endpoint, options = {}) {
  const url = \`\${API_BASE}\${endpoint}\`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Các helper methods
export const api = {
  get: (endpoint) => apiRequest(endpoint),
  
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};

// Sử dụng
// import { api } from './api';
// const posts = await api.get('/posts');
// const newPost = await api.post('/posts', { title: 'Hi' });
\`\`\`

## 💡 Tips & Best Practices

**1. Luôn kiểm tra response.ok**
\`\`\`javascript
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}
\`\`\`

**2. Set timeout để tránh request treo**
\`\`\`javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

fetch(url, { signal: controller.signal })
  .finally(() => clearTimeout(timeoutId));
\`\`\`

**3. Xử lý loading và error states**
- Hiển thị loading spinner khi đang fetch
- Hiển thị error message khi fail
- Cho phép retry khi lỗi

**4. Cache data khi cần**
- Dùng React Query hoặc SWR cho data fetching advanced
- Implement cache trong localStorage cho offline support

## 🎓 Kết luận
Fetch API là công cụ mạnh mẽ và đơn giản để gọi REST API trong JavaScript. Kết hợp với async/await, bạn có thể viết code async rõ ràng và dễ maintain.

**Key takeaways**:
- Luôn dùng async/await thay vì .then() chains
- Xử lý errors đúng cách với try/catch
- Tạo helper functions để tái sử dụng
- Quản lý loading/error states trong UI

**Bài tập thực hành**: Xây dựng một CRUD app hoàn chỉnh với React + Fetch API, có form validation, optimistic updates, và error recovery.`
  },
  {
    id: 5,
    title: "WebSocket trong JS: Chat thời gian thực",
    excerpt: "Triển khai client WebSocket đơn giản, gửi/nhận tin nhắn và xử lý reconnect.",
    datetime: "2025-10-16T11:20:00+07:00",
    body: `## 📌 Giới thiệu
WebSocket cung cấp kết nối hai chiều (bidirectional) giữa client và server, cho phép truyền dữ liệu real-time mà không cần polling. Hoàn hảo cho chat apps, live notifications, multiplayer games, và trading platforms.

## 🎯 Mục tiêu học
- Hiểu sự khác biệt giữa WebSocket và HTTP
- Tạo WebSocket client trong trình duyệt
- Xây dựng WebSocket server với Node.js
- Implement reconnect logic và heartbeat

## 🔧 Hướng dẫn thực hiện

### Bước 1: Tạo WebSocket Server (Node.js)

\`\`\`javascript
// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Lưu danh sách clients
const clients = new Set();

server.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);
  
  // Gửi welcome message
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Welcome to chat!'
  }));
  
  // Nhận message từ client
  ws.on('message', (data) => {
    console.log('Received:', data.toString());
    
    const message = JSON.parse(data.toString());
    
    // Broadcast tới tất cả clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          user: message.user,
          text: message.text,
          timestamp: new Date().toISOString()
        }));
      }
    });
  });
  
  // Xử lý disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server running on ws://localhost:8080');
\`\`\`

### Bước 2: Tạo WebSocket Client (Browser)

\`\`\`javascript
class ChatClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectInterval = 5000;
    this.connect();
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.addEventListener('open', () => {
      console.log('Connected to server');
      this.onOpen();
    });
    
    this.ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.onMessage(data);
    });
    
    this.ws.addEventListener('close', () => {
      console.log('Disconnected from server');
      this.onClose();
      // Auto reconnect
      setTimeout(() => this.connect(), this.reconnectInterval);
    });
    
    this.ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      this.onError(error);
    });
  }
  
  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
  
  // Callback methods (override when using)
  onOpen() {}
  onMessage(data) {}
  onClose() {}
  onError(error) {}
}

// Sử dụng
const chat = new ChatClient('ws://localhost:8080');

chat.onOpen = () => {
  console.log('Chat connected!');
};

chat.onMessage = (data) => {
  console.log('New message:', data);
  // Update UI
  displayMessage(data);
};

// Gửi message
function sendMessage() {
  const input = document.getElementById('messageInput');
  chat.send({
    user: 'User123',
    text: input.value
  });
  input.value = '';
}
\`\`\`

### Bước 3: React Component với WebSocket

\`\`\`javascript
import React, { useState, useEffect, useRef } from 'react';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  
  useEffect(() => {
    // Kết nối WebSocket
    ws.current = new WebSocket('ws://localhost:8080');
    
    ws.current.onopen = () => {
      setConnected(true);
      console.log('Connected');
    };
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };
    
    ws.current.onclose = () => {
      setConnected(false);
      console.log('Disconnected');
    };
    
    // Cleanup khi unmount
    return () => {
      ws.current?.close();
    };
  }, []);
  
  const sendMessage = () => {
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        user: 'Me',
        text: input
      }));
      setInput('');
    }
  };
  
  return (
    <div className="chat-container">
      <div className="status">
        {connected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
      
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
\`\`\`

## 💡 Tips & Best Practices

**1. Heartbeat/Ping-Pong** để detect broken connections:
\`\`\`javascript
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'ping' }));
  }
}, 30000); // Ping mỗi 30 giây
\`\`\`

**2. Reconnect with exponential backoff**:
\`\`\`javascript
let reconnectDelay = 1000;
function reconnect() {
  setTimeout(() => {
    connect();
    reconnectDelay = Math.min(reconnectDelay * 2, 30000);
  }, reconnectDelay);
}
\`\`\`

**3. Buffer messages khi offline**:
- Lưu messages vào queue khi disconnected
- Gửi lại khi reconnect thành công

## 🎓 Kết luận
WebSocket là công nghệ thiết yếu cho real-time applications. Bạn đã học được cách tạo client/server, xử lý lifecycle events, và implement reconnection logic.

**So sánh WebSocket vs HTTP**:
- **HTTP**: Request-response, stateless, polling overhead
- **WebSocket**: Persistent connection, bidirectional, low latency

**Bài tập thực hành**: 
1. Thêm typing indicator ("User is typing...")
2. Implement private messages giữa 2 users
3. Thêm file sharing qua WebSocket
4. Deploy server lên Heroku/Railway và test với production URL`
  },
  {
    id: 6,
    title: "So sánh Java & JavaScript trong mạng",
    excerpt: "Điểm mạnh/điểm yếu khi làm network programming: thread vs event loop, thư viện phổ biến.",
    datetime: "2025-10-17T09:00:00+07:00",
    body: `## 📌 Giới thiệu
Java và JavaScript là hai ngôn ngữ phổ biến trong lập trình mạng, nhưng chúng có cách tiếp cận hoàn toàn khác nhau. Hiểu rõ sự khác biệt giúp bạn chọn công nghệ phù hợp cho dự án.

## 🎯 Mục tiêu học
- So sánh mô hình xử lý: Multi-threading vs Event Loop
- Hiểu performance characteristics của mỗi ngôn ngữ
- Chọn công nghệ phù hợp cho từng use case
- Nắm các thư viện network phổ biến

## 🔧 So sánh chi tiết

### Mô hình xử lý

**Java - Multi-threading**
\`\`\`java
// Java xử lý mỗi connection trong thread riêng
ServerSocket server = new ServerSocket(8080);
ExecutorService executor = Executors.newFixedThreadPool(100);

while (true) {
  Socket client = server.accept();
  executor.submit(() -> {
    // Xử lý client trong thread riêng
    handleClient(client);
  });
}
\`\`\`

**JavaScript - Event Loop (Single Thread)**
\`\`\`javascript
// JavaScript xử lý tất cả connections trong 1 thread
const server = http.createServer((req, res) => {
  // Non-blocking I/O
  fs.readFile('data.json', (err, data) => {
    res.end(data);
  });
});

server.listen(8080);
\`\`\`

### Xử lý JSON

**Java (Jackson)**
\`\`\`java
ObjectMapper mapper = new ObjectMapper();

// Serialize
String json = mapper.writeValueAsString(user);

// Deserialize
User user = mapper.readValue(json, User.class);
\`\`\`

**JavaScript (Native)**
\`\`\`javascript
// Serialize
const json = JSON.stringify(user);

// Deserialize
const user = JSON.parse(json);
\`\`\`

### Async Operations

**Java (CompletableFuture)**
\`\`\`java
CompletableFuture.supplyAsync(() -> fetchData())
  .thenApply(data -> processData(data))
  .thenAccept(result -> System.out.println(result))
  .exceptionally(ex -> {
    System.err.println(ex);
    return null;
  });
\`\`\`

**JavaScript (async/await)**
\`\`\`javascript
async function processData() {
  try {
    const data = await fetchData();
    const result = await process(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## 📊 Bảng so sánh

| Tiêu chí | Java | JavaScript |
|----------|------|------------|
| **Mô hình** | Multi-threading | Event Loop (Single thread) |
| **I/O** | Blocking (mặc định) | Non-blocking |
| **Concurrency** | Thread-based | Callback/Promise-based |
| **Performance** | High throughput | High concurrency |
| **CPU-intensive** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **I/O-intensive** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Type safety** | Static typing | Dynamic typing |
| **Learning curve** | Steep | Moderate |

## 🛠️ Thư viện phổ biến

### Java
- **Netty**: High-performance network framework
- **OkHttp**: Modern HTTP client
- **Apache HttpComponents**: HTTP library mạnh mẽ
- **Spring WebFlux**: Reactive web framework

### JavaScript
- **axios**: Promise-based HTTP client
- **socket.io**: Real-time bidirectional communication
- **ws**: WebSocket library cho Node.js
- **node-fetch**: Fetch API cho Node.js

## 💡 Khi nào dùng gì?

### Chọn Java khi:
- Hệ thống enterprise lớn, cần scale vertically
- CPU-intensive tasks (data processing, encoding)
- Cần type safety và compile-time checking
- Team đã quen với Java ecosystem

### Chọn JavaScript khi:
- Real-time applications (chat, notifications)
- High concurrency với I/O-intensive
- Rapid prototyping và development
- Fullstack với cùng một ngôn ngữ (MERN/MEAN stack)

## 🎓 Kết luận
Không có ngôn ngữ nào "tốt hơn" - chỉ có phù hợp hơn cho từng use case. Java mạnh về performance và type safety, JavaScript mạnh về developer experience và real-time capabilities.

**Key takeaways**:
- Java: Threading model, blocking I/O (có thể dùng NIO/Netty cho non-blocking)
- JavaScript: Event loop, non-blocking I/O by default
- Cả hai đều có thể xây dựng high-performance network applications

**Bài tập**: Thử implement cùng một API (REST + WebSocket) bằng cả Java (Spring Boot) và JavaScript (Express + Socket.io), so sánh performance và developer experience.`
  },
  {
    id: 7,
    title: "JSON và truyền dữ liệu trong lập trình mạng",
    excerpt: "Cách serialize/deserialize JSON trong Java và JS, định dạng hợp lệ, và thủ thuật an toàn.",
    datetime: "2025-10-18T15:00:00+07:00",
    body: `## 📌 Giới thiệu
JSON (JavaScript Object Notation) là định dạng dữ liệu phổ biến nhất trong web development và API communication. Bài này sẽ hướng dẫn cách xử lý JSON an toàn và hiệu quả trong cả Java và JavaScript.

## 🎯 Mục tiêu học
- Hiểu cấu trúc và syntax của JSON
- Serialize/Deserialize trong Java và JavaScript
- Validate và sanitize JSON data
- Best practices về security và performance

## 🔧 Hướng dẫn thực hiện

### Cấu trúc JSON cơ bản

\`\`\`json
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "a@example.com",
  "active": true,
  "roles": ["user", "admin"],
  "profile": {
    "age": 25,
    "city": "Hà Nội"
  },
  "createdAt": "2025-10-18T10:00:00Z"
}
\`\`\`

### Java - Sử dụng Jackson

**Bước 1: Thêm dependency (Maven)**
\`\`\`xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.15.2</version>
</dependency>
\`\`\`

**Bước 2: Tạo POJO class**
\`\`\`java
import com.fasterxml.jackson.annotation.*;
import java.time.Instant;
import java.util.List;

public class User {
  private Long id;
  private String name;
  private String email;
  private boolean active;
  private List<String> roles;
  private Profile profile;
  
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
  private Instant createdAt;
  
  // Constructors, getters, setters
  
  public static class Profile {
    private int age;
    private String city;
    // getters, setters
  }
}
\`\`\`

**Bước 3: Serialize/Deserialize**
\`\`\`java
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonExample {
  public static void main(String[] args) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    
    // Deserialize: JSON string -> Object
    String json = "{\\"id\\":1,\\"name\\":\\"Test\\"}";
    User user = mapper.readValue(json, User.class);
    
    // Serialize: Object -> JSON string
    String output = mapper.writeValueAsString(user);
    System.out.println(output);
    
    // Pretty print
    String prettyJson = mapper
      .writerWithDefaultPrettyPrinter()
      .writeValueAsString(user);
    System.out.println(prettyJson);
  }
}
\`\`\`

### JavaScript - Native JSON API

**Parse (Deserialize)**
\`\`\`javascript
const jsonString = '{"id":1,"name":"Test"}';

try {
  const user = JSON.parse(jsonString);
  console.log(user.name); // "Test"
} catch (error) {
  console.error('Invalid JSON:', error);
}
\`\`\`

**Stringify (Serialize)**
\`\`\`javascript
const user = {
  id: 1,
  name: "Test",
  email: "test@example.com"
};

// Basic stringify
const json = JSON.stringify(user);

// Pretty print với indent
const prettyJson = JSON.stringify(user, null, 2);

// Selective serialization
const filtered = JSON.stringify(user, ['id', 'name']);
\`\`\`

### Xử lý nested objects và arrays

\`\`\`javascript
const data = {
  users: [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" }
  ],
  metadata: {
    total: 2,
    page: 1
  }
};

// Serialize
const json = JSON.stringify(data);

// Deserialize và truy cập
const parsed = JSON.parse(json);
console.log(parsed.users[0].name); // "User 1"
console.log(parsed.metadata.total); // 2
\`\`\`

## 🔒 Security Best Practices

### 1. Validate input trước khi parse

\`\`\`javascript
function safeJsonParse(str) {
  try {
    // Kiểm tra basic format
    if (typeof str !== 'string') {
      throw new Error('Input must be string');
    }
    
    // Parse
    const obj = JSON.parse(str);
    
    // Validate structure
    if (!obj || typeof obj !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    
    return obj;
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}
\`\`\`

### 2. Tránh injection attacks

\`\`\`javascript
// ❌ NGUY HIỂM - Không bao giờ làm thế này!
const userInput = '{"name":"<script>alert(\\'XSS\\')</script>"}';
eval('const data = ' + userInput); // NEVER USE EVAL!

// ✅ ĐÚNG - Luôn dùng JSON.parse
const data = JSON.parse(userInput);
// Sau đó sanitize output khi hiển thị
\`\`\`

### 3. Handle large JSON files

\`\`\`java
// Java - Stream large JSON
JsonParser parser = factory.createParser(new File("large.json"));
while (parser.nextToken() != null) {
  // Process incrementally
}
\`\`\`

## 💡 Tips & Tricks

### Custom serialization (JavaScript)

\`\`\`javascript
const user = {
  name: "Test",
  password: "secret123",
  toJSON() {
    // Exclude password khi serialize
    return {
      name: this.name
    };
  }
};

JSON.stringify(user); // {"name":"Test"}
\`\`\`

### Date handling

\`\`\`javascript
// Serialize date
const data = {
  createdAt: new Date()
};
const json = JSON.stringify(data);
// {"createdAt":"2025-10-18T10:00:00.000Z"}

// Deserialize date với custom reviver
const parsed = JSON.parse(json, (key, value) => {
  if (key === 'createdAt') {
    return new Date(value);
  }
  return value;
});
\`\`\`

## 🎓 Kết luận
JSON là backbone của modern web APIs. Việc xử lý JSON đúng cách không chỉ đảm bảo app hoạt động mà còn bảo vệ khỏi security vulnerabilities.

**Key takeaways**:
- Luôn validate và sanitize JSON input
- Không bao giờ dùng eval() để parse JSON
- Handle errors gracefully với try/catch
- Cẩn thận với circular references và date serialization

**Bài tập thực hành**: Tạo một API gateway validate tất cả JSON requests, log invalid attempts, và implement rate limiting dựa trên request structure.`
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
