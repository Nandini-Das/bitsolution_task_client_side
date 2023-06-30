import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, Link } from 'react-router-dom';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { useForm } from 'react-hook-form';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
});

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const img_hosting_token = 'bad0a0d3cc7ea65959919397f864ab82';
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  
  useEffect(() => {
    axios
      .get(`https://bitsolution-task-server-nandini-das.vercel.app/addedProduct/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const updatedProduct = {
        name: data.namegi,
        brandName: data.brand,
        category: data.category,
        unit: data.unit,
        purchasePrice: data.purchasePrice,
        salePrice: data.salePrice,
        description: data.description,
        image: data.picture[0],
      };
  
      if (data.picture && data.picture.length > 0) {
        const formData = new FormData();
        formData.append('image', data.picture[0]);
  
        const imgResponse = await fetch(img_hosting_url, {
          method: 'POST',
          body: formData,
        });
  
        const imgData = await imgResponse.json();
  
        if (imgData.success) {
          updatedProduct.image = imgData.data.display_url;
        }
      }
  
      const result = await axios.patch(`https://bitsolution-task-server-nandini-das.vercel.app/updateProduct/${product._id}`, updatedProduct);
  
      if (result.data.message === 'Product updated successfully') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully',
        });
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TASK DEMO
          </Typography>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button component={Link} to="/addProduct" color="inherit">
            Add Product
          </Button>
          <Button component={Link} to="/addedProduct" color="inherit">
            All Product
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" align="center" gutterBottom>
        Update Product
      </Typography>
      <StyledForm onSubmit={handleSubmit(handleUpdate)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              defaultValue={product?.name}
              {...register('name', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              defaultValue={product?.brandName}
              {...register('brand', { required: true })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              defaultValue={product?.category}
              {...register('category', { required: true })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Unit"
              defaultValue={product?.unit}
              {...register('unit', { required: true })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Price"
              defaultValue={product?.purchasePrice}
              {...register('purchasePrice', { required: true })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sale Price"
              defaultValue={product?.salePrice}
              {...register('salePrice', { required: true })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              defaultValue={product?.description}
              {...register('description', { required: true })}
              required
            />
          </Grid>
        </Grid>
        {product?.image && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  src={product?.image}
                  alt="Previous Picture"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="image">Update Image</InputLabel>
              <Input
                id="image"
                type="file"
                {...register('picture')}
                accept="image/*"
              />
            </Grid>
          </Grid>
        )}
        <Button type="submit" variant="contained" color="primary">
          Update Product
        </Button>
      </StyledForm>
    </div>
  );
};

export default UpdateProduct;
