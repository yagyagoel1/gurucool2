import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose-fix';

const mockgoose = new Mockgoose(mongoose);

mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

export default mongoose;
