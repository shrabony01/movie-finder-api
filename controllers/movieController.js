import axios from "axios";

const OMDB_BASE_URL = "http://www.omdbapi.com/";

//serach  movie by title
export const searchMovies = async(req,res)=>{
    const {title}=req.query;  //grab the title from the url

    //return 400 if title is missing/blank
    if(!title || title.trim() === ''){
        return res.status(400).json({
            error: "Title query parameter is required",
        });
    }
    try{
        const response = await axios.get(OMDB_BASE_URL,{
            params:{
                s:title.trim(),
                apikey:process.env.OMDB_API_KEY,
            },
        });
        if(response.data.Response === "False"){
            return res.status(404).json({
                error: response.data.Error || 'No movies found matching that title',
            });
        }
        return res.status(200).json(response.data);
    }catch(error){
        console.error("Error fetching movies from OMDb:", error.message);

        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json({
          error: "Failed to fetch movie search results from external API",
        });
    }
};
    //full details for one specific movie using its imdb id

    export const getMovieDetails = async (req,res) =>{
        const {id} = req.params;

        try{
            const response = await axios.get(OMDB_BASE_URL,{
                params:{
                    i:id,
                    apikey: process.env.OMDB_API_KEY,
                },
            });
            //if id doesnt exist send a error
            if(response.data.Response=== "False"){
                return res.status(404).json({
                    error:response.data.Error || "Movie not found with the provided ID",
                });
            }
            //full movie details back as  json
            return res.status(200).json(response.data);
        }catch(error){
            console.error('Error fetching details for movie ID ${id}:',error.message);

            const statusCode = error.response ? error.response.status:500;
            return res.status(statusCode).json({
                error: "Failed to fetch movie details from external API",
            });
        }
    };

