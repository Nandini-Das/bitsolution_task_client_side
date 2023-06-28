import React, { useEffect, useState } from 'react';
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

    const [formData, setFormData] = useState({
        product: '',
        brandName: '',
        productGroup: '',
        category: '',
        unit: '',
        purchasePrice: '',
        salePrice: '',
        description: '',
        picture: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            picture: file,
        }));
    };

    const handleSubmit = (e) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('product', formData.product);
        formDataToSend.append('brandName', formData.brandName);
        formDataToSend.append('productGroup', formData.productGroup);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('unit', formData.unit);
        formDataToSend.append('purchasePrice', formData.purchasePrice);
        formDataToSend.append('salePrice', formData.salePrice);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('picture', formData.picture);

        axios
            .post('https://bitsolution-task-server-nandini-das.vercel.app/addedProduct', formDataToSend)
            .then((result) => {
                console.log(result.data);
                if (result.data.message === 'Product added successfully') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product added successfully',
                    });
                }
            })
            .catch((error) => {

                console.error('Error submitting form data:', error.response);
                
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
                    <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                    <Button component={Link} to="/addProduct" color="inherit"> Add Product</Button>
                    <Button component={Link} to="/addedProduct" color="inherit">All Product</Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Add Product
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Product Name"
                                name="product"
                                value={formData.product}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Brand Name"
                                name="brandName"
                                value={formData.brandName}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
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
                                name="productGroup"
                                value={formData.productGroup}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
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
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
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
                                name="unit"
                                value={formData.unit}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Purchase Price/Unit"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Sale Price/Unit"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                accept="image/*"
                                name="picture"
                                onChange={handleFileChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>

    );
};

export default AddProduct;
