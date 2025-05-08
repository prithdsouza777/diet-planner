import pandas as pd

# Sample comprehensive dataset for a diet planner
data = [
    {
        "age_range": "18-25",
        "weight_range": "50-60",
        "activity_level": "sedentary",
        "goal": "lose weight",
        "calories": 1500,
        "protein_g": 90,
        "fat_g": 50,
        "carbs_g": 130,
        "breakfast": "Oatmeal with berries",
        "lunch": "Grilled chicken salad",
        "dinner": "Steamed fish with vegetables"
    },
    {
        "age_range": "26-35",
        "weight_range": "61-70",
        "activity_level": "moderate",
        "goal": "maintain weight",
        "calories": 2200,
        "protein_g": 120,
        "fat_g": 70,
        "carbs_g": 220,
        "breakfast": "Eggs with whole grain toast",
        "lunch": "Turkey sandwich with salad",
        "dinner": "Chicken stir-fry with brown rice"
    },
    {
        "age_range": "36-45",
        "weight_range": "71-80",
        "activity_level": "active",
        "goal": "gain weight",
        "calories": 2800,
        "protein_g": 150,
        "fat_g": 90,
        "carbs_g": 300,
        "breakfast": "Protein smoothie with peanut butter",
        "lunch": "Grilled steak with quinoa",
        "dinner": "Salmon with sweet potato and avocado"
    },
    {
        "age_range": "18-25",
        "weight_range": "50-60",
        "activity_level": "active",
        "goal": "maintain weight",
        "calories": 2000,
        "protein_g": 110,
        "fat_g": 65,
        "carbs_g": 210,
        "breakfast": "Greek yogurt with granola",
        "lunch": "Chicken wrap with veggies",
        "dinner": "Tofu curry with brown rice"
    },
    {
        "age_range": "26-35",
        "weight_range": "71-80",
        "activity_level": "sedentary",
        "goal": "lose weight",
        "calories": 1600,
        "protein_g": 100,
        "fat_g": 55,
        "carbs_g": 140,
        "breakfast": "Scrambled eggs with spinach",
        "lunch": "Lentil soup with salad",
        "dinner": "Grilled shrimp with vegetables"
    },
]

df = pd.DataFrame(data)
df.to_csv('diet_plan_dataset.csv', index=False)
print("Dataset created successfully!")