import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  border-collapse: collapse;

  & th,
  & td {
    border: 1px solid rgba(224, 224, 224, 1);
    padding: 12px;
  }

  & th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  & td {
    text-align: center;
  }
`;

const AllProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/addedProduct')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

   

    const handleDelete = (product) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/addedProduct/${product._id}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(data => {
                if (data.deletedCount > 0) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  );
                  // Refresh the products list after successful deletion
                  setProducts(products.filter(p => p._id !== product._id));
                }
              })
              .catch(error => {
                console.error('Error deleting product:', error);
              });
          }
        });
      };
      
    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                All Products
            </Typography>
            <TableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Purchase Price</TableCell>
                            <TableCell>Sale Price</TableCell>
                            <TableCell>Available Quantity</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.product}</TableCell>
                                <TableCell>{product.brandName}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.unit}</TableCell>
                                <TableCell>{product.purchasePrice}</TableCell>
                                <TableCell>{product.salePrice}</TableCell>
                                <TableCell>{product.availableQuantity}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                       
                                    >
                                      <Link to={`/updateProduct/${product._id}`}>Update</Link>
                                    </Button>
                                    {' '}
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(product)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </div>
    );
};

export default AllProduct;
