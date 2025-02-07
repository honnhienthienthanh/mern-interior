import mongoose from 'mongoose'

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch(err) {
        console.log(err)
    }
}

export default connectToDatabase