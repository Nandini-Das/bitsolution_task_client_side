import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';

const AddProduct = () => {
    const img_hosting_token = 'bad0a0d3cc7ea65959919397f864ab82';
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('https://bitsolution-task-server-nandini-das.vercel.app/allProducts')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.picture[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { productName, brandName, productGroup, category, unit, purchasePrice, salePrice, description } = data;
                    const newItem = {
                    
                        name: productName,
                        brandName,
                        productGroup,
                        category,
                        unit,
                        purchasePrice: parseFloat(purchasePrice),
                        salePrice: parseFloat(salePrice),
                        description,
                        image: imgURL,
                    };
                    console.log(newItem);
                    axios.post('https://bitsolution-task-server-nandini-das.vercel.app/addedProduct', newItem)
                    .then((response) => {
                      const data = response.data;
                      console.log('after posting new item', data);
                  
                      if (data.message === 'Product added successfully') {
                        reset();
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Item added successfully',
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    });
                  
                }
            });
    };

    const brands = Array.from(new Set(products.map((product) => product.brand_name)));
    const groups = Array.from(new Set(products.map((product) => product.product_group)));
    const categories = Array.from(new Set(products.map((product) => product.product_category)));

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TASK DEMO
                    </Typography>
                    <Button component={Link} to="/dashboard" color="inherit">
                        Dashboard
                    </Button>
                    <Button component={Link} to="/addProduct" color="inherit">
                        {' '}
                        Add Product
                    </Button>
                    <Button component={Link} to="/addedProduct" color="inherit">
                        All Product
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Add Product
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Product Name"
                                {...register('productName', { required: true })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Brand Name"
                                {...register('brandName', { required: true })}
                                fullWidth
                                margin="normal"
                            >
                                {brands.map((brand) => (
                                    <MenuItem key={brand} value={brand}>
                                        {brand}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Product Group"
                                {...register('productGroup', { required: true })}
                                fullWidth
                                margin="normal"
                            >
                                {groups.map((group) => (
                                    <MenuItem key={group} value={group}>
                                        {group}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Category"
                                {...register('category', { required: true })}
                                fullWidth
                                margin="normal"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unit"
                                {...register('unit', { required: true })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Purchase Price/Unit"
                                {...register('purchasePrice', { required: true })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Sale Price/Unit"
                                {...register('salePrice', { required: true })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                {...register('description', { required: true })}
                                fullWidth
                                multiline

                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                        <TextField
                            label="Choose Image"
                            name="picture"
                            type="file"
                            inputProps={{
                                accept: 'image/*',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            {...register('picture', { required: true })}
                            error={!!errors.picture}
                            helperText={errors.picture ? 'Please choose an image' : ''}
                        />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>

                </form>
            </Box>
        </>
    );
};

export default AddProduct;
