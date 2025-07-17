// Get /api/user

export const getUserData = async (req,res)=>{
    try {
        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;
        res.json({success:true,role,recentSearchCities}) 
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


// store User recent Searched Cties

export const storeRecentSearchedCities = async (req,res)=>{
    try {
        const {recentSearchCities} = req.body;
        const user = await req.user;
        if(user.recentSearchCities.length < 3){
            user.recentSearchCities.push(recentSearchCities);
        }else{
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCities);
        }
        await user.save();
        res.json({success:true,message:"City added to recent search"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
