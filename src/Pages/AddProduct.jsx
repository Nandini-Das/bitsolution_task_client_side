import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const brands = ['Brand A', 'Brand B', 'Brand C'];
const categories = ['Category A', 'Category B', 'Category C'];
const groups = ['Group A', 'Group B', 'Group C'];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    productGroup: '',
    category: '',
    unit: '',
    purchasePrice: '',
    salePrice: '',
    availableQuantity: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
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
              select
              label="Brand Name"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
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
              name="productGroup"
              value={formData.productGroup}
              onChange={handleInputChange}
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
              name="category"
              value={formData.category}
              onChange={handleInputChange}
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
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Available Quantity"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
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
  );
};

export default AddProduct;
