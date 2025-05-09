import { pgTable, serial, text, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).unique(),
  phoneNumber: varchar('phone_number', { length: 15 }).unique(),
  password: varchar('password', { length: 100 }),
  userType: varchar('user_type', { length: 10 }).notNull(), // 'farmer' or 'buyer'
  fullName: varchar('full_name', { length: 100 }),
  profileImage: text('profile_image'),
  authProvider: varchar('auth_provider', { length: 20 }), // 'google', 'apple', 'email', 'phone'
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Price in cents
  imageUrl: text('image_url'),
  category: varchar('category', { length: 50 }),
  quantity: integer('quantity').notNull().default(0),
  farmerId: integer('farmer_id').notNull(),
  wasteType: varchar('waste_type', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cart items
export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
});

// Favorites
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  productId: integer('product_id').notNull(),
});

// Relations
export const productsRelations = relations(products, ({ one }) => ({
  farmer: one(users, {
    fields: [products.farmerId],
    references: [users.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
}));

// Types
export type User = InferSelectModel<typeof users>;
export type Product = InferSelectModel<typeof products>;
export type CartItem = InferSelectModel<typeof cartItems>;
export type Favorite = InferSelectModel<typeof favorites>;

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  phoneNumber: true,
  password: true,
  userType: true,
  fullName: true,
  profileImage: true,
  authProvider: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  quantity: true,
  farmerId: true,
  wasteType: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  productId: true,
  quantity: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  userId: true,
  productId: true,
});

// Export types for insert operations
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;