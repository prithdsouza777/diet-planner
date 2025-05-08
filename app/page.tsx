"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Utensils, Activity, Target } from "lucide-react"

export default function Home() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    dietGoal: "",
  })

  const [dietPlan, setDietPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Assuming Flask backend is running on port 5000
      const response = await fetch("http://localhost:5000/api/diet-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch diet plan")
      }

      const data = await response.json()
      setDietPlan(data)
    } catch (err) {
      console.error("Error fetching diet plan:", err)
      setError("Failed to get diet plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Personal Diet Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Enter your height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => handleSelectChange("activityLevel", value)}
                    required
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietGoal">Diet Goal</Label>
                  <Select
                    value={formData.dietGoal}
                    onValueChange={(value) => handleSelectChange("dietGoal", value)}
                    required
                  >
                    <SelectTrigger id="dietGoal">
                      <SelectValue placeholder="Select diet goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose weight">Lose Weight</SelectItem>
                      <SelectItem value="maintain weight">Maintain Weight</SelectItem>
                      <SelectItem value="gain weight">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Generate Diet Plan"
                )}
              </Button>

              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </CardContent>
        </Card>

        <div>
          {dietPlan ? (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Your Personalized Diet Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="text-xl font-bold">{dietPlan.calories}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="text-xl font-bold">{dietPlan.protein_g}g</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="text-xl font-bold">{dietPlan.carbs_g}g</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4 py-2">
                    <h3 className="font-semibold">Breakfast</h3>
                    <p>{dietPlan.breakfast}</p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <h3 className="font-semibold">Lunch</h3>
                    <p>{dietPlan.lunch}</p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4 py-2">
                    <h3 className="font-semibold">Dinner</h3>
                    <p>{dietPlan.dinner}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-gray-500" />
                    <h3 className="font-semibold">Diet Summary</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    This plan is designed for a {formData.age} year old with {formData.activityLevel} activity level who
                    wants to {formData.dietGoal}. Total daily calories: {dietPlan.calories} kcal with{" "}
                    {dietPlan.protein_g}g protein, {dietPlan.fat_g}g fat, and {dietPlan.carbs_g}g carbohydrates.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Diet Plan Generated Yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Fill out your information and click the "Generate Diet Plan" button to get your personalized diet
                  recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
