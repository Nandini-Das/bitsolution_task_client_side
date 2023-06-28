import React, { useState } from 'react';
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
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
});

const UpdateProduct = () => {
    const product = useLoaderData();
    const [productName, setProductName] = useState(product.product);
    const [brand, setBrand] = useState(product.brandName);
    const [category, setCategory] = useState(product.category);
    const [unit, setUnit] = useState(product.unit);
    const [purchasePrice, setPurchasePrice] = useState(product.purchasePrice);
    const [salePrice, setSalePrice] = useState(product.salePrice);
    const [description, setDescription] = useState(product.description);
    const [picture, setPicture] = useState(null);

    const handleUpdate = (event, id) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('product', productName);
        formDataToSend.append('brandName', brand);
        formDataToSend.append('category', category);
        formDataToSend.append('unit', unit);
        formDataToSend.append('purchasePrice', purchasePrice);
        formDataToSend.append('salePrice', salePrice);
        formDataToSend.append('description', description);
        formDataToSend.append('picture', picture);

        axios.put(`https://bitsolution-task-server-nandini-das.vercel.app/updateProduct/${product._id}`, formDataToSend)
            .then((result) => {
                console.log(result);
                if (result.data.message === 'Product updated successfully') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product updated successfully',
                    });
                }
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
    };

    return (
        <div>
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
            <Typography variant="h4" align="center" gutterBottom>
                Update Product
            </Typography>
            <StyledForm onSubmit={handleUpdate}>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <TextField
                    label="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <TextField
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <TextField
                    label="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    required
                />
                <TextField
                    label="Purchase Price"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    required
                />
                <TextField
                    label="Sale Price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {product.picture && (
                    <Card>
                        <CardMedia component="img" src={`https://bitsolution-task-server-nandini-das.vercel.app/uploads/${product.picture}`} alt="Previous Picture" />
                    </Card>
                )}
                <InputLabel htmlFor="picture-input">Picture</InputLabel>
                <Input
                    id="picture-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Product
                </Button>
            </StyledForm>
        </div>
    );
};

export default UpdateProduct;
