class GetDataFetch {
    getResourse = async (url)  => {
        const res = await fetch(url)

        if(res.ok){
            return await res.json()
        } else {
            throw new Error("Error happend!");
        }
    }

    getPosts = async () => await this.getResourse("db/database.json")
    
}

export default GetDataFetch