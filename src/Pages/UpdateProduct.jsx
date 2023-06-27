import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';
import { useLoaderData } from 'react-router-dom';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
});

const UpdateProduct = () => {
  const addedProducts = useLoaderData();
  console.log(addedProducts)
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [picture, setPicture] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log('Form submitted');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Update Product
      </Typography>
      <StyledForm onSubmit={handleFormSubmit}>
        <TextField
          label="Product Name"
          value={addedProducts.product}
          onChange={(e) => setProductName(e.target.value)}
          required
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
          label="Available Quantity"
          value={availableQuantity}
          onChange={(e) => setAvailableQuantity(e.target.value)}
          required
        />
          <InputLabel htmlFor="picture-input">Picture</InputLabel>
        <Input
          id="picture-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Product
        </Button>
      </StyledForm>
    </div>
  );
};


export default UpdateProduct;
