import NextLink from 'next/link';
import Product from '../models/Product';
import Layout from '../components/Layout';
import data from '../utils/data';
import db from '../utils/db';

import {
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/styles';

export default function Home(props) {
  const { products } = props;

  if (!products) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary">
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.converDocToObj),
    },
  };
}
