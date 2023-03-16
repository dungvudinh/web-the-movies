const apiConfig= {
    baseURL:'http://api.themoviedb.org/3/',
    apiKey:'a02356efd16d5168f72c4661c0154f15',
    originalImage:(imgPath)=> `http://image.tmdb.org/t/p/original/${imgPath}`,
    img500:(imgPath)=>`https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig;