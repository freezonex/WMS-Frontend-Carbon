'use client';
import React from 'react';
import {
  Modal,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  TableSelectAll,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Heading,
  IconButton,
} from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';

const headers = [
  { key: 'materialName', header: 'Material Name' },
  { key: 'materialCode', header: 'Material Code' },
  { key: 'rfid', header: 'RFID' },
  { key: 'type', header: 'Type' },
  { key: 'unit', header: 'Unit' },
];

const rows = [
  {
    id: 'apple',
    materialName: 'Apple',
    materialCode: 'Product#2',
    rfid: 'fjsewol39492',
    type: 'Procurement',
    unit: 'Ton',
  },
  {
    id: 'banana',
    materialName: 'Banana',
    materialCode: 'Product#4',
    rfid: 'fjsewol36594',
    type: 'Procurement',
    unit: 'Ton',
  },
  {
    id: 'orange',
    materialName: 'Orange',
    materialCode: 'Product#6',
    rfid: '-',
    type: 'Procurement',
    unit: 'Ton',
  },
  {
    id: 'watermelon',
    materialName: 'Watermelon',
    materialCode: 'Product#7',
    rfid: '-',
    type: 'Procurement',
    unit: 'Ton',
  },
  {
    id: 'pear',
    materialName: 'Pear',
    materialCode: 'Product#15',
    rfid: 'fjsewol36349',
    type: 'Procurement',
    unit: 'Ton',
  },
];

function ProductModal({ isModalOpen, setModalOpen }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Products"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following products entered the designated warehouse in this inbound
        task.
      </Heading>
      <DataTable
        rows={rows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          onInputChange,
        }) => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <IconButton className="mr-1" label="Add">
                  <Add />
                </IconButton>
                <IconButton label="Remove">
                  <Subtract />
                </IconButton>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header) => (
                    <TableHeader key={header} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => {
                  return (
                    <TableRow
                      key={i}
                      {...getRowProps({
                        row,
                      })}
                    >
                      <TableSelectRow
                        {...getSelectionProps({
                          row,
                        })}
                      />
                      {row.cells.map((cell) => {
                        return (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </Modal>
  );
}

export default ProductModal;