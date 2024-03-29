'use client';
import React, { useState, useEffect } from 'react';
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
  TextInput,
  Button,
  Link,
  Pagination,
} from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';
import {
  addStorageLocation,
  deleteStorageLocation,
  fetchStorageLocationsByWId,
} from '@/actions/actions';
import WMSDataTable from '../Table/DataTable';

const headers = [
  { key: 'name', header: 'Shelf Location' },
  { key: 'occupied', header: 'Occupied' },
  { key: 'materials', header: 'Material' },
];

function ShelfLocationModal({ isModalOpen, setModalOpen, warehouse_info }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  const [selectedRowMaterials, setSelectedRowMaterial] = useState([]);
  const [formValue, setFormValues] = useState({
    name: '',
  });
  console.log(selectedRowMaterials);
  const onFormValueChange = (e) => {
    const { id, value } = e.target; // Destructure the name and value from the event target

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value, // Use the name to update the correct property
    }));
  };
  useEffect(() => {
    if (isModalOpen && warehouse_info) {
      fetchStorageLocationsByWId(
        {
          warehouse_id: warehouse_info.id,
        },
        { pageNum: page, pageSize }
      ).then((res) => {
        setRows(res.list);
        setTotal(res.total);
      });
      setIsCreate(false);
      setShowMaterial(false);
    }
  }, [isModalOpen, warehouse_info, page, pageSize]);

  const handleAddShelfLocation = () => {
    console.log();
    addStorageLocation({
      warehouse_id: warehouse_info.id,
      name: formValue.name,
    }).then(() => {
      setIsCreate(false);
      setFormValues({
        name: '',
      });
      fetchStorageLocationsByWId(
        {
          warehouse_id: warehouse_info.id,
        },
        { pageNum: page, pageSize }
      ).then((res) => setRows(res.list));
    });
  };
  const handleDeleteSelectedRows = () => {
    console.log(selectedRows);
    const deletePromises = selectedRows.map((row) =>
      deleteStorageLocation({ id: row.id })
    );

    Promise.all(deletePromises)
      .then(() => {
        setSelectedRows([]);
        fetchStorageLocationsByWId({
          warehouse_id: warehouse_info.id,
        }).then((res) => setRows(res.list));
      })
      .catch((error) => {
        console.error('Delete Storage Location Error:', error);
      });
  };

  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Shelf Location"
      passiveModal
      onRequestClose={() => {
        setModalOpen(false);
        setRows([]);
      }}
      size="lg"
    >
      {!isCreate && !showMaterial && (
        <>
          <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
            All shelf location under this warehouse -{' '}
            {warehouse_info.warehouse_id} -{warehouse_info.warehouse_name}.
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
                    <IconButton
                      className="mr-1"
                      label="Add"
                      onClick={() => {
                        setIsCreate(true);
                      }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      label="Remove"
                      onClick={handleDeleteSelectedRows}
                    >
                      <Subtract />
                    </IconButton>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={i}>
                        <TableSelectRow
                          {...getSelectionProps({ row })}
                          onChange={(checked) => {
                            if (checked) {
                              setSelectedRows((prevSelectedRows) => [
                                ...prevSelectedRows,
                                row,
                              ]);
                            } else {
                              setSelectedRows((prevSelectedRows) =>
                                prevSelectedRows.filter(
                                  (selectedRow) => selectedRow.id !== row.id
                                )
                              );
                            }
                          }}
                        />
                        {headers.map((header) => {
                          const cell = row.cells.find(
                            (cell) => cell.id.split(':')[1] === header.key
                          );
                          if (cell.id.split(':')[1] === 'occupied') {
                            return (
                              <TableCell key={header.key}>
                                {cell ? (cell.value ? 'true' : 'false') : ''}
                              </TableCell>
                            );
                          }
                          if (cell.id.split(':')[1] === 'materials') {
                            console.log(cell.value);
                            return (
                              <TableCell key={header.key}>
                                <Link
                                  onClick={() => {
                                    setShowMaterial(true);
                                    setSelectedRowMaterial(cell.value);
                                  }}
                                >
                                  More
                                </Link>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={header.key}>
                              {cell ? cell.value : ''}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  backwardText="Previous page"
                  forwardText="Next page"
                  itemsPerPageText="Items per page:"
                  page={page}
                  pageNumberText="Page Number"
                  pageSize={pageSize}
                  pageSizes={[5, 10, 20, 30, 40, 50]}
                  totalItems={total}
                  onChange={({ page, pageSize }) => {
                    setPage(page);
                    setPageSize(pageSize);
                  }}
                />
              </TableContainer>
            )}
          />
        </>
      )}
      {isCreate && (
        <div>
          <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
            Add a shelf Location
          </Heading>
          <TextInput
            labelText="Name"
            id="name"
            placeholder="Name"
            value={formValue.name}
            onChange={onFormValueChange}
          />
          <div className="flex space-x-4 mt-4 justify-center ">
            <Button size="sm" onClick={handleAddShelfLocation}>
              Save
            </Button>
            <Button
              size="sm"
              kind="tertiary"
              onClick={() => {
                setIsCreate(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {showMaterial && (
        <div>
          <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
            All materials on this shelf
          </Heading>
          <WMSDataTable
            headers={[
              { key: 'material_name', header: 'material Name' },
              { key: 'quantity', header: 'Quantity' },
            ]}
            rows={
              selectedRowMaterials && selectedRowMaterials.length > 0
                ? selectedRowMaterials.map((row) => {
                    return { ...row, id: row.material_id };
                  })
                : []
            }
          ></WMSDataTable>
          <div className="flex space-x-4 mt-4 justify-center ">
            <Button
              size="sm"
              kind="tertiary"
              onClick={() => {
                setShowMaterial(false);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ShelfLocationModal;
