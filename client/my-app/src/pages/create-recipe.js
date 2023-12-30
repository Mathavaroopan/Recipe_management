import { useState } from "react";
import './css/create-recipe.css'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const CreateRecipes = () => {
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        owner: window.localStorage.getItem("userID"),
      });
    
    const [cookies, ] = useCookies(["access_token"])

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    }

    const addIngredient = (event) => {
        event.preventDefault();
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({ ...recipe, ingredients });
        
    }

    const handleIngredientChange = (event, index) => {
        const ingredients = recipe.ingredients;
        ingredients[index] = event.target.value;
        setRecipe({...recipe, ingredients});
    }
    console.log(recipe)

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", { ...recipe });

            alert("Recipe Created");
            navigate('/');
        }catch(err){
            console.log(err.message);
        }
    }
    return (
        <div className="main">
            <form onSubmit={onSubmit}>
                <h2>Create Recipe</h2>
                <input type="text" id="name" name="name" placeholder="Recipe name..." onChange={handleChange}/>
                {recipe.ingredients.map((ingredient, index) => {
                    return <input key={index} value={ingredient} name="ingredients" type="text" placeholder="Ingredient" onChange={(event) => handleIngredientChange(event, index)}/>
                })}
                <button onClick={addIngredient}>Add Ingredient</button>
                <textarea id="instructions" name="instructions" placeholder="Instructions..." onChange={handleChange}/>
                <input type="text" id="url" name="imageUrl"  placeholder="Image url..." onChange={handleChange}/>   
                <input type="number" id="time" name="cookingTime"  placeholder="Cooking time..." onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateRecipes;