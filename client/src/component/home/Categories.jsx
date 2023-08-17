import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import "./Categories.css"
import { categories } from '../account/constant/data'
import { Link, useSearchParams } from 'react-router-dom'


function Categories() {
    const [searchparams] = useSearchParams();
    const category = searchparams.get("category")
    return (
        <>

            <Table className='table'>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link className='linkk' to="/">
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell>
                                    <Link className='linkk' to={`/?category=${cat.type}`}>
                                        {cat.type}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))


                    }
                </TableBody>

            </Table>
        </ >
    )
}

export default Categories