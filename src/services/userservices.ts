import { query } from "../config/database";
import client from "../config/redis";
import { User } from "../models/User";

export class UserService {
  private static CACHE_TTL = 300;
  static async createUser (
    userData: Omit<User, "id" | "created_at">
  ): Promise<User> {
    const result = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [userData.name, userData.email]
    );
    const user = result.rows[0];
    // Cache the new user
    await client.setEx(`user:${user.id}`, this.CACHE_TTL, JSON.stringify(user));
    await client.del('users:all');
   
    return user;
  }


  static async getUserById(id: number): Promise<User | null>{
    const cashed = await client.get(`user:${id}`);
    if (cashed) {
        console.log(`Cache hit for user ${id}`);
        return JSON.parse(cashed);
    }
    console.log('💾 Cache MISS for user:', id);
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
     await client.setEx(
      `user:${id}`, 
      this.CACHE_TTL, 
      JSON.stringify(user)
    );
    return user;
  }


  static async getAllUsers(): Promise<User[]> {
    const cachedUsers = await client.get('users:all');
    if (cachedUsers){
        console.log('Cache hit for all users');
        return JSON.parse(cachedUsers);
    }
    console.log('💾 Cache MISS for all users')
    const result = await query('SELECT * FROM users');
    const users = result.rows;
    // Cache all users
    await client.setEx('users:all', this.CACHE_TTL, JSON.stringify(users));
    return users;
  }

  static async deleteUser(id:number): Promise<boolean> {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount && result.rowCount > 0) {
      // Remove from cache
      await client.del(`user:${id}`);
      await client.del('users:all');
      return true;
    }
    return false;
  }
 }
 
