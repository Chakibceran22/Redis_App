import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set test environment
process.env.NODE_ENV = 'test';

// Use test database URLs or fallback to regular ones
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/testdb';
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Global test configuration
jest.setTimeout(30000); // 30 second timeout for all tests

// Global setup for all tests
beforeAll(() => {
  console.log('🧪 Starting Redis Performance Tests');
  console.log('📊 Database:', process.env.DATABASE_URL);
  console.log('🔴 Redis:', process.env.REDIS_URL);
});

afterAll(() => {
  console.log('✅ All performance tests completed');
});