import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import productsRoutes from './src/products/application/productRoutes'
import checkMongo from './src/utils/checkMongo'
import dotenv from 'dotenv'

dotenv.config()
const app = Express();


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


 
app.use('/products', productsRoutes)

app.get('/health', (req, res) => res.send('Hello World'));

checkMongo(process.env.MONGO_URI || 'mongodb://db:27017/test')


const PORT = process.env.PORT || 3000;
 

app.listen(PORT, () => {
  console.log('server run on PORT ' + PORT);
});

export default app
