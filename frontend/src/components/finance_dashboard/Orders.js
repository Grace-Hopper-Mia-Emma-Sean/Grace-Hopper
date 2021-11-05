import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { OrderDetails } from '..';
import { Container } from '@mui/material';

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '31 October 2021',
//     'Mia Mia',
//     'Antartica, USA',
//     'VISA •••• 3719',
//     999.99,
//   ),
//   createData(
//     1,
//     '31 October 2021',
//     'Emma Emma',
//     'London, UK',
//     'VISA •••• 2574',
//     866.99,
//   ),

//   createData(
//     3,
//     '31 October 2021',
//     'Sean Sean',
//     'Bolder, Colorado',
//     'AMEX •••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '31 October 2021',
//     'Kylie Jenner',
//     'Long Beach, CA',
//     'VISA ••• 5919',
//     1.99,
//   ),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Orders({
  cardNumber,
  setCardNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  city,
  setCity,
  state,
  setState,
  currentTotal,
  setCurrentTotal
}) {

  // function createData(id, date, name, shipTo, paymentMethod, amount) {
  //   return { id, date, name, shipTo, paymentMethod, amount };
  // }
  // const rows = [{firstName, lastName, cardNumber, city, state, currentTotal}];
  
  return (
    // <React.Fragment>
    //   <Title>Recent Orders</Title>
    //   <Table size="small">
    //     <TableHead>
    //       <TableRow>
    //         {/* <TableCell>Date</TableCell> */}
    //         <TableCell>Name</TableCell>
    //         <TableCell>Ship To</TableCell>
    //         <TableCell>Card on File</TableCell>
    //         <TableCell align="right">Sale Amount</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow>
    //           {/* <TableCell>{row.date}</TableCell> */}
    //           <TableCell>{row.firstName} {row.lastName} </TableCell>
    //           <TableCell>{row.city}, {row.state}</TableCell>
    //           <TableCell>{row.cardNumber}</TableCell>
    //           <TableCell align="right">{`$${row.currentTotal}`}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </React.Fragment>

    <Container> 
      <OrderDetails/>
    </Container>
  );
}
