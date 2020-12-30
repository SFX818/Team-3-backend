module.exports = mongoose => {
    //declaring our schema for mongoose
    const Product = mongoose.model(
        'product',
        mongoose.Schema(
            {
                name: String,
                price: String,
                description: String,
                userSelling: String
                //image: cloundinary
            },
            //auto generates timestamp
            {timestamps: true}
        )
    )
    return Product
}