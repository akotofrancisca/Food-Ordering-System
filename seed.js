import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";

dotenv.config();
console.log("MONGO_URI is:", process.env.MONGO_URI);


const items = [
  { name: "Margherita Pizza", description: "Classic with fresh basil", price: 45, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/500px-Pizza_Margherita_stu_spivack.jpg", category: "Pizza", inStock: true, tags: ["Vegetarian"] },
  { name: "Pepperoni Pizza", description: "All-time favorite", price: 55, image: "https://www.simplyrecipes.com/thmb/X2B0QCVdGJWGO1gW6GR7cz1rhe0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg", category: "Pizza", inStock: true },
  { name: "Chicken Burger", description: "Grilled chicken and cheese", price: 35, image: "https://hips.hearstapps.com/hmg-prod/images/chicken-burgers-lead-667b185b5c64f.jpg?crop=0.9995509654243376xw:1xh;center,top&resize=1200:*", category: "Burgers", inStock: true },
  { name: "Veggie Salad", description: "Crisp greens & vinaigrette", price: 25, image: "https://www.familyfoodonthetable.com/wp-content/uploads/2023/03/Marinated-veggie-salad-1200-4.jpg", category: "Salads", inStock: true, tags: ["Vegan", "Gluten-Free"] },
  { name: "Jollof Rice", description: "Spicy Ghanaian jollof", price: 30, image: "https://eatwellabi.com/wp-content/uploads/2022/11/Jollof-rice-16.jpg", category: "Mains", inStock: true, tags: ["Vegetarian", "Gluten-Free"] },
  { name: "Beef Shawarma", description: "Middle Eastern wrap with beef", price: 40, image: "https://www.themediterraneandish.com/wp-content/uploads/2021/02/beef-shawarma-recipe-8.jpg", category: "Wraps", inStock: true },
  { name: "Fried Rice", description: "Chinese-style fried rice", price: 32, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzx3wnJhpjNniii0fndSIaCxuekk4CtefRxiy9KvjJ_iczLozLXczieBG-xtMqNX2jgwZQMfBJIQ1LXTo_3xH7mqbWgZy7yzX-rRelEQkX", category: "Mains", inStock: true, tags: ["Vegetarian"] },
  { name: "Grilled Tilapia", description: "Whole tilapia with spices", price: 60, image: "https://gingerandseasalt.com/wp-content/uploads/2023/10/tilapia-grill-baskets.jpg", category: "Seafood", inStock: true, tags: ["Gluten-Free"] },
  { name: "Spring Rolls", description: "Crispy veggie rolls", price: 20, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTO7FXjoTA77k0hu2Wh1uaA74EzMr7Ssen45fpNizMy_fQlPXywgBSbl852DrLauAz4w3HEeWsGDuheIWRzIIst0LnXX666HAGG6YYzl3cd", category: "Snacks", inStock: true, tags: ["Vegan"] },
  { name: "Chocolate Cake", description: "Rich chocolate dessert", price: 28, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS_G7zN2fyXTFk3AgV7bBauSLpwru4R7JaPFgMJ2_yknPKAwxGVw8gEqUJ9yvZj2m7HmIvBJt0Vk3wsfTdlGZnJ99_9TOy9V-K0gQ9blgBKEQ", category: "Desserts", inStock: true },
  { name: "Chicken Wings", description: "Spicy fried wings", price: 38, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS0mfNoK8N3QNorfhsIFPeaw8MclC4_sL0HTJOIH9yWXaWq4JemFZyTFha3m9m5Z6QGLNmQATX7aFY-WHltXEcn6R2pAHp5jSWEv5ss-j-i", category: "Snacks", inStock: true },
  { name: "Caesar Salad", description: "Classic Caesar with croutons", price: 27, image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=400", category: "Salads", inStock: true, tags: ["Vegetarian"] },
    { name: "Falafel Wrap", description: "Chickpea falafel with veggies and tahini sauce", price: 33, image: "https://cookingwithayeh.com/wp-content/uploads/2024/03/Falafel-Wrap-1.jpg", category: "Wraps", inStock: true, tags: ["Vegan"] },
    { name: "Shrimp Pasta", description: "Creamy pasta with grilled shrimp", price: 50, image: "https://littlesunnykitchen.com/wp-content/uploads/2020/09/Garlic-Shrimp-Pasta-16.jpg", category: "Mains", inStock: true, tags: ["Gluten-Free"] },
    { name: "Greek Salad", description: "Fresh salad with feta, olives, and cucumber", price: 29, image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/07/greek-salad-2.jpg", category: "Salads", inStock: true, tags: ["Vegetarian", "Gluten-Free"] },
    { name: "BBQ Ribs", description: "Slow-cooked pork ribs with BBQ sauce", price: 65, image: "https://www.allrecipes.com/thmb/QK6wyyBLDKEhdg5BkHNRSsPYMDI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/22469-Barbecue-Ribs-ddmfs-4x3-208-0221b0213517493494a29c1c76a8d1cc.jpg", category: "Mains", inStock: true },
    { name: "Avocado Toast", description: "Sourdough toast with smashed avocado and seeds", price: 22, image: "https://cookieandkate.com/images/2012/04/avocado-toast-recipe-3.jpg", category: "Snacks", inStock: true, tags: ["Vegan"] },
    { name: "Sushi Platter", description: "Assorted sushi rolls and nigiri", price: 70, image: "https://media.istockphoto.com/id/690451580/photo/japanese-cuisine.jpg?s=612x612&w=0&k=20&c=XZS9V4GN9o8M89TZ-2xtSSGLqzbfYHc1U9PcaS-RrBY=", category: "Seafood", inStock: true },
    { name: "Lentil Soup", description: "Hearty soup with lentils and vegetables", price: 24, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqfefzKTQklN9vzR2G43PQAGZnVau0SpfrVM5HepA2NAf7VDjSeanm_GrsyCn4EMh7WutZc8n37y4DU9wxpxvzz1mRrO15N4gPuiVTe2a", category: "Mains", inStock: true, tags: ["Vegan", "Gluten-Free"] },
    { name: "Pancakes", description: "Fluffy pancakes with maple syrup", price: 26, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQw4xpeolxxta78qv4lWVjiyBNIHJ260NOXxCcavasG-mfEcCuVuXheP9YrYfLwq_Wo7Kq4NaEhkByjv3ZPvvDfYww-ZZg0O3yxm4H0vXHpXg", category: "Desserts", inStock: true, tags: ["Vegetarian"] },
    { name: "Egg Fried Noodles", description: "Stir-fried noodles with egg and vegetables", price: 34, image: "https://www.justspices.co.uk/media/recipe/Egg-Fried-Noodles_Just-Spices.webp", category: "Mains", inStock: true },
    { name: "Fruit Parfait", description: "Layers of yogurt, granola, and fresh fruit", price: 30, image: "https://feelgoodfoodie.net/wp-content/uploads/2025/06/fruit-and-yogurt-parfait-10.jpg", category: "Desserts", inStock: true, tags: ["Vegetarian"] }
];

try {
  const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: "food_ordering" });
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(items);
  console.log("Seeded menu items:", items.length);
  await conn.disconnect();
} catch (e) {
  console.error(e);
  process.exit(1);
}
