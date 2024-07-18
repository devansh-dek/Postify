import mongoose from 'mongoose';

const connect = async () => {
    await mongoose.connect('mongodb://localhost/twitterProject')

}

export default connect;