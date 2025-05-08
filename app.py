from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset
df = pd.read_csv('diet_plan_dataset.csv')

@app.route('/api/diet-plan', methods=['POST'])
def get_diet_plan():
    # Get user data from request
    user_data = request.json
    
    # Extract user information
    age = int(user_data.get('age'))
    weight = float(user_data.get('weight'))
    activity_level = user_data.get('activityLevel')
    diet_goal = user_data.get('dietGoal')
    
    # Determine age range
    if 18 <= age <= 25:
        age_range = "18-25"
    elif 26 <= age <= 35:
        age_range = "26-35"
    else:
        age_range = "36-45"
    
    # Determine weight range
    if 50 <= weight <= 60:
        weight_range = "50-60"
    elif 61 <= weight <= 70:
        weight_range = "61-70"
    else:
        weight_range = "71-80"
    
    # Find the closest matching diet plan
    filtered_df = df[
        (df['age_range'] == age_range) & 
        (df['activity_level'] == activity_level) & 
        (df['goal'] == diet_goal)
    ]
    
    # If no exact match, find the closest one
    if filtered_df.empty:
        filtered_df = df[
            (df['activity_level'] == activity_level) & 
            (df['goal'] == diet_goal)
        ]
    
    # If still no match, just get one with the same goal
    if filtered_df.empty:
        filtered_df = df[df['goal'] == diet_goal]
    
    # If still no match, return any plan
    if filtered_df.empty:
        filtered_df = df
    
    # Get the first matching plan
    diet_plan = filtered_df.iloc[0].to_dict()
    
    # Add some personalization based on user data
    height = float(user_data.get('height', 170))
    gender = user_data.get('gender', 'male')
    
    # Calculate BMI and adjust calories if needed
    bmi = weight / ((height / 100) ** 2)
    
    # Simple calorie adjustment based on BMI
    calorie_adjustment = 0
    if bmi > 25 and diet_goal == "lose weight":
        calorie_adjustment = -100
    elif bmi < 18.5 and diet_goal == "gain weight":
        calorie_adjustment = 200
    
    # Gender-based adjustment
    if gender == "female":
        calorie_adjustment -= 200
    
    diet_plan['calories'] = diet_plan['calories'] + calorie_adjustment
    
    # Return the diet plan
    return jsonify(diet_plan)

if __name__ == '__main__':
    app.run(debug=True)