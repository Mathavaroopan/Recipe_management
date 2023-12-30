import axios from "axios";
import { useEffect, useState } from "react";
// import './css/home.css'
const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);


    const userID = window.localStorage.getItem("userID");
    useEffect(() => {

        const fetchRecipe = async() => {
            try{
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch(err) {
                console.log(err.message);
            }
        }

        const fetchSavedRecipe = async() => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes)
                console.log(response.data);
            } catch(err) {
                console.log(err.message);
            }
        }

        fetchRecipe();
        fetchSavedRecipe(); 
    }, [])

    const saveRecipe = async(recipeID) => {
        try{
            const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID});
            setSavedRecipes(response.data.savedRecipes);
        } catch(err) {
            console.log(err.message);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="main">
            <h1>Recipes</h1>
            <ul className="lists">
                {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <div className="name">
                        <h2>{recipe.name}</h2>
                        <button
                            onClick={() => saveRecipe(recipe._id)}
                            disabled={isRecipeSaved(recipe._id)}
                        >
                            {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                        </button>
                    </div>
                    <div className="instructions">
                    <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <p>Cooking Time: {recipe.cookingTime} minutes</p>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;