// export default 'Iam an exported string.';
import axios from 'axios';

class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // const proxy = 
        // const key = 
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); // it return a promise
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}

export default Search;



// const getRecipes = () => {
//     axios.get("kanclkasnlknavslk").then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.error(error);
//     });
// }

// const getRecipes = async () => {
//     try {   
//         const result = await axios.get("ascasv");
//         console.log(result);
//     }
//     catch(error) {
//         console.log(error);
//     }
// }







// post
// get
// // put
// // delete




