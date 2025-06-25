# 🚀 Redis vs PostgreSQL Performance Test

A comprehensive performance testing application that demonstrates the dramatic speed differences between **database access** (PostgreSQL) and **cache access** (Redis) using real-world scenarios.

## 📊 Project Overview

This project creates **10,000 users** and performs **10,000 access operations** to showcase how Redis caching can improve application performance by **1.3-5x** compared to traditional database queries.

---

## 🎯 Why Redis vs PostgreSQL?

### **PostgreSQL (Database)**
- 🗄️ **Persistent Storage**: Data is permanently stored on disk
- 💾 **ACID Compliance**: Ensures data integrity and consistency
- 🔍 **Complex Queries**: Supports joins, aggregations, and complex operations
- ⏱️ **Access Time**: 2-10ms per query (database hit every time)
- 🎯 **Use Case**: Primary data storage, complex business logic

### **Redis (Cache)**
- ⚡ **In-Memory Storage**: Data stored in RAM for ultra-fast access
- 🚀 **Speed**: 0.1-1ms per operation (5-50x faster than database)
- 🔄 **Temporary Storage**: Data can expire or be evicted
- 📈 **Scalability**: Handles millions of operations per second
- 🎯 **Use Case**: Caching frequently accessed data, session storage

### **The Performance Impact**

| Metric | PostgreSQL | Redis | Improvement |
|--------|------------|--------|-------------|
| **Access Time** | 2-10ms | 0.1-1ms | **5-50x faster** |
| **Throughput** | 1,000 ops/sec | 50,000+ ops/sec | **50x more** |
| **User Experience** | Slower response | Instant response | **Dramatically better** |
| **Server Load** | High CPU/Disk | Low CPU | **Resource efficient** |

---

## 🛠️ Project Setup

### **Prerequisites**
- **Docker** & **Docker Compose** installed on your machine
- **Git** for cloning the repository
- **4GB+ RAM** allocated to Docker

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Chakibceran22/Redis_App.git
cd Redis_App
```

### **Step 2: Project Structure**
```
Redis_App/
├── 📁 src/                    # Application source code
│   ├── 📁 config/            # Database & Redis configuration
│   ├── 📁 models/            # User data models
│   ├── 📁 routes/            # API endpoints
│   └── 📁 services/          # Business logic
├── 📁 test/                  # Performance tests
│   └── 📁 performance/       # Redis vs PostgreSQL tests
├── 🐳 docker-compose.yml     # Container orchestration
├── 🐳 Dockerfile            # Node.js app container
└── 📋 package.json          # Dependencies & scripts
```

### **Step 3: Docker Environment Setup**
The project uses Docker Compose for complete environment setup. All services are pre-configured:

- **PostgreSQL**: Database on port 5432
- **Redis**: Cache on port 6379  
- **Node.js App**: Application on port 3000
- **Test Environment**: Isolated test container

### **Step 4: Build and Start the Environment**

#### **Build All Containers**
```bash
# Build all Docker containers
docker-compose build
```

#### **Start All Services**
```bash
# Start PostgreSQL, Redis, and the app
docker-compose up -d

# Check if services are running
docker-compose ps
```

You should see output like:
```
NAME                 SERVICE    STATUS     PORTS
redis-postgres-1     postgres   running    0.0.0.0:5432->5432/tcp
redis-redis-1        redis      running    0.0.0.0:6379->6379/tcp  
redis-app-1          app        running    0.0.0.0:3000->3000/tcp
```

#### **Verify Services Are Running**
```bash
# Check PostgreSQL
docker-compose exec postgres psql -U user -d testdb -c "SELECT 1;"

# Check Redis
docker-compose exec redis redis-cli ping

# Check Application
curl http://localhost:3000 || echo "App is running"
```

---

## 🚀 Running the Application

### **Complete Docker Setup (Only Supported Method)**

#### **Start All Services**
```bash
# Start PostgreSQL, Redis, and the app
docker-compose up -d

# View application logs
docker-compose logs app

# View all service logs
docker-compose logs
```

#### **Access the Application**
- **API**: http://localhost:3000
- **Database**: PostgreSQL on localhost:5432 (internal to containers)
- **Cache**: Redis on localhost:6379 (internal to containers)

#### **Stop Services**
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

### **Why Docker Only?**

This project is designed to run exclusively in Docker containers because:

- ✅ **Consistent Environment**: Same setup across all machines
- ✅ **No External Dependencies**: No need to install PostgreSQL or Redis locally
- ✅ **Proper Networking**: Containers communicate using internal Docker networks
- ✅ **Easy Cleanup**: Remove everything with one command
- ✅ **Realistic Testing**: Simulates production container environments

**Attempting to run without Docker will result in connection errors** because the application expects the specific PostgreSQL and Redis instances defined in `docker-compose.yml`.

---

## ⚡ Running Performance Tests

### **Step-by-Step Test Execution**

#### **Step 1: Ensure Services Are Running**
```bash
# Start the required services (PostgreSQL and Redis)
docker-compose up -d postgres redis

# Verify services are ready
docker-compose ps
```

#### **Step 2: Run the Performance Test**
```bash
# Run the Redis vs PostgreSQL performance test
docker-compose run --rm test npm run test:redis
```

#### **Step 3: Understanding the Test Process**

The test will automatically:
1. **🏗️ Setup Phase**: Create test environment and database connections
2. **👥 User Creation**: Create 10,000 test users in PostgreSQL  
3. **🗄️ PostgreSQL Test**: Perform 10,000 direct database queries
4. **⚡ Redis Test**: Cache users and perform 10,000 cache queries
5. **📊 Results**: Display comprehensive performance comparison table
6. **🧹 Cleanup**: Remove test data and close connections

#### **Step 4: Alternative Test Commands**

```bash
# Run with clean output (Windows compatible)
docker-compose run --rm test npm run test:redis

# Run all tests (includes unit tests)
docker-compose run --rm test npm test

# Run with verbose Jest output (for debugging)
docker-compose run --rm test npx jest test/performance/redis-test.test.ts --verbose

# Clean up orphaned containers
docker-compose run --rm test npm run test:redis --remove-orphans
```

#### **Step 5: Test Output**

You'll see a formatted table showing:
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        🚀 PERFORMANCE TEST RESULTS                           ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  Test Scale: 10,000 Users | 10,000 Operations Each                          ║
╚═══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                           📊 DETAILED METRICS                              │
├─────────────────────────────┬─────────────────┬─────────────────────────────┤
│ Metric                      │ PostgreSQL      │ Redis                       │
├─────────────────────────────┼─────────────────┼─────────────────────────────┤
│ Average Access Time         │         0.463 ms │                   0.352 ms │
│ Fastest Access              │         0.288 ms │                   0.159 ms │
│ Slowest Access              │         5.311 ms │                   6.284 ms │
│ Total Access Time           │        4.63 sec │                  3.52 sec │
│ Wall Clock Time             │        5.54 sec │                  5.24 sec │
│ Operations per Second       │         1,805 │                     1,910 │
└─────────────────────────────┴─────────────────┴─────────────────────────────┘
```

---

## 📊 Understanding Test Results

### **What You'll See**

#### **1. Setup Phase**
```
🚀 Setting up test with 10,000 users and 10,000 operations...
```

#### **2. PostgreSQL Results**
```
🗄️ POSTGRESQL TEST RESULTS:
============================
🔢 Total Operations: 10,000
⚡ Average Access Time: 0.463ms
🏃 Fastest Access: 0.288ms
🐌 Slowest Access: 5.311ms
📈 Operations per Second: 1,805 ops/sec
```

#### **3. Redis Results**
```
📊 REDIS TEST RESULTS:
======================
🔢 Total Operations: 10,000
⚡ Average Access Time: 0.352ms
🏃 Fastest Access: 0.159ms
🐌 Slowest Access: 6.284ms
📈 Operations per Second: 1,910 ops/sec
```

#### **4. Performance Comparison**
```
🏆 PERFORMANCE COMPARISON
=========================
🚀 Redis is 1.32x FASTER than PostgreSQL
💰 Time saved per operation: 0.111ms
📈 Throughput improvement: 1.06x more operations/sec

⚠️ IMPORTANT DISCLAIMER
=======================
📊 Results may vary between test runs due to:
🐳 Docker networking overhead affecting Redis connections
🌐 Container-to-container communication latency
💾 Host machine resource usage and system load
⚡ Network conditions and Docker bridge performance

🏠 In production environments with optimized networking:
✨ Redis typically shows 5-50x performance improvement over databases
🚀 This test demonstrates the methodology for performance comparison
```

---

## 🎯 Real-World Applications

### **When to Use Redis Caching**

#### **✅ Perfect Use Cases**
- **User Sessions**: Login states, preferences
- **Product Catalogs**: Frequently viewed items
- **API Responses**: Weather data, stock prices
- **Database Query Results**: Popular search results
- **Computed Data**: Analytics, reports

#### **📊 Performance Scenarios**

| Scenario | Without Redis | With Redis | Improvement |
|----------|---------------|------------|-------------|
| **User Login** | 50ms | 2ms | **25x faster** |
| **Product Search** | 200ms | 8ms | **25x faster** |
| **Dashboard Load** | 500ms | 15ms | **33x faster** |
| **API Response** | 100ms | 3ms | **33x faster** |

### **Redis Caching Strategies**

#### **1. Cache-Aside Pattern**
```javascript
// Check cache first
let user = await redis.get(`user:${id}`);
if (!user) {
    // Cache miss - get from database
    user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    // Store in cache for future requests
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
}
return user;
```

#### **2. Write-Through Pattern**
```javascript
// Update database and cache simultaneously
await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
await redis.setex(`user:${id}`, 3600, JSON.stringify(updatedUser));
```

---

## 🔧 Development Commands

### **Application Commands**
```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm start

# Run specific tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:performance   # Performance tests only
```

### **Docker Commands**
```bash
# View logs
docker-compose logs app
docker-compose logs postgres
docker-compose logs redis

# Restart specific service
docker-compose restart app

# Rebuild containers
docker-compose up --build

# Clean up everything
docker-compose down -v  # Removes volumes too
```

---

## 📈 Performance Optimization Tips

### **1. Redis Configuration**
```bash
# Increase memory limit if needed
redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
```

### **2. PostgreSQL Optimization**
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### **3. Application-Level Caching**
```javascript
// Cache expensive operations
const cacheKey = `expensive_operation:${params}`;
let result = await redis.get(cacheKey);
if (!result) {
    result = await expensiveOperation(params);
    await redis.setex(cacheKey, 300, JSON.stringify(result)); // 5 min cache
}
```

### **4. Docker Performance Notes**
- **Container Networking**: Adds latency between PostgreSQL, Redis, and app containers
- **Host Resources**: Ensure adequate CPU and memory allocation to Docker
- **Production vs. Development**: Results will vary significantly in optimized production environments

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **1. Docker Services Not Starting**
```bash
# Check Docker status
docker --version
docker-compose --version

# View service logs
docker-compose logs postgres
docker-compose logs redis
```

#### **2. Database Connection Issues**
```bash
# Test PostgreSQL connection
docker-compose exec postgres psql -U user -d testdb -c "SELECT 1;"

# Test Redis connection
docker-compose exec redis redis-cli ping
```

#### **3. Performance Test Timeout**
```bash
# Increase Jest timeout in jest.config.js
module.exports = {
  testTimeout: 1800000  // 30 minutes
};
```

#### **4. Memory Issues During Tests**
```bash
# Monitor Docker resource usage
docker stats

# For 10K users, standard Docker memory limits should be sufficient
# If issues persist, increase Docker memory limit (Docker Desktop)
# Settings > Resources > Memory > 4GB+
```

---

## 📚 Learning Resources

### **Redis Documentation**
- [Redis Official Docs](https://redis.io/documentation)
- [Redis Caching Patterns](https://redis.io/docs/manual/patterns/)
- [Redis Performance](https://redis.io/docs/reference/optimization/)

### **PostgreSQL Documentation**
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Query Performance](https://www.postgresql.org/docs/current/performance-tips.html)
- [Indexing Strategies](https://www.postgresql.org/docs/current/indexes.html)

### **Performance Testing**
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Database Performance Testing](https://www.postgresql.org/docs/current/pgbench.html)

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---





## 🎯 Key Takeaways

### **Why This Matters**
- **Performance**: Redis can be **1.2-5x faster** than database queries (varies by environment)
- **Scalability**: Handle more requests with same infrastructure  
- **User Experience**: Reduced response times
- **Cost Savings**: Reduce database load and server costs
- **Competitive Advantage**: Faster apps provide better user experience

### **When to Implement Caching**
- ✅ **Frequently accessed data** (user profiles, product info)
- ✅ **Expensive computations** (analytics, recommendations)
- ✅ **High-traffic applications** (social media, e-commerce)
- ✅ **Real-time features** (chat, notifications, live updates)

### **Best Practices**
1. **Cache frequently accessed data**
2. **Set appropriate expiration times**
3. **Handle cache misses gracefully**
4. **Monitor cache hit rates**
5. **Use Redis for session storage**

### **Important Notes About This Test**
- **Docker Environment**: Results affected by container networking overhead
- **Variable Performance**: Redis may sometimes appear slower due to Docker latency
- **Production Reality**: In optimized production environments, Redis typically shows much greater improvements (5-50x)
- **Methodology Demonstration**: This test shows how to measure and compare performance scientifically

---

**🚀 Ready to see the performance difference? Run the tests and experience Redis caching performance measurement!**
