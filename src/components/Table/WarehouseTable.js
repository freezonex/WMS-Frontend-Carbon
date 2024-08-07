'use client';
import React, { useState, useEffect } from 'react';
import {
  HeaderGlobalAction,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Link,
  IconButton,
  Pagination,
} from '@carbon/react';
import { Edit, Delete, DataTable } from '@carbon/icons-react';
import './_table.scss';
import ShelfLocationModal from '../Modal/ShelfLocationModal';
import {
  deleteWarehouse,
  fetchWarehouses,
  fetchWarehousesWithFilters,
} from '@/actions/actions';
import EditWarehouseModal from '../Modal/EditWarehouseModal';
import TableSkeleton from '../Skeleton/TableSkeleton';
import ShowMessageModal from '../Modal/ShowMessageModal';
import { hasPermission } from '@/utils/utils';

function WarehouseTable({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  //const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const filteredFormValue = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    fetchWarehousesWithFilters(filteredFormValue, {
      pageNum: page,
      pageSize,
    }).then((res) => {
      setRows(res.list);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page, pageSize, refresh, filters, isSearchClicked]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };

  const handleDeleteRow = async (id) => {
    ShowMessageModal.showConfirm('Are you sure to delete?', () => {
      deleteWarehouse(id).then((res) => setRefresh({}));
    });
  };
  const handleShowShelves = (id, warehouse_id, name) => {
    setSelectedWarehouseInfo({
      id: id,
      warehouse_id: warehouse_id,
      warehouse_name: name,
    });
    setModalOpen(true);
  };
  console.log(selectedWarehouseInfo);

  return (
    <div>
      {loading && <TableSkeleton headers={headers} />}
      <StructuredListWrapper isCondensed>
        {!loading && (
          <StructuredListHead>
            <StructuredListRow head className="headerRow">
              {headers.map((header, index) => (
                <StructuredListCell head key={header.key}>
                  {header.header}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
        )}
        <StructuredListBody>
          {rows.map((row, index) => (
            <StructuredListRow key={row.id}>
              {headers.map((header) => {
                if (header.key === 'storage_location') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() =>
                          handleShowShelves(
                            row.id,
                            row['warehouse_id'],
                            row['name']
                          )
                        }
                      >
                        All Locations
                      </Link>
                    </StructuredListCell>
                  );
                }
                if (header.key == 'operation') {
                  return (
                    <StructuredListCell key={header.key} className="w-[100px]">
                      <IconButton
                        size="sm"
                        kind="ghost"
                        className="mr-[0.5rem]"
                        disabled={!hasPermission()}
                      >
                        <Edit size={15} onClick={() => handleEditRow(row)} />
                      </IconButton>
                      <IconButton
                        size="sm"
                        kind="ghost"
                        onClick={() => handleDeleteRow(row.id)}
                        disabled={!hasPermission()}
                      >
                        <Delete size={15} />
                      </IconButton>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell key={header.key}>
                    {row[header.key]}
                  </StructuredListCell>
                );
              })}
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={page}
        pageNumberText="Page Number"
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={total}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
      <ShelfLocationModal
        warehouse_info={selectedWarehouseInfo}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></ShelfLocationModal>

      <EditWarehouseModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        warehouseValues={editRow}
        setRefresh={setRefresh}
        setWarehouseValues={setEditRow}
      ></EditWarehouseModal>
    </div>
  );
}

export default WarehouseTable;
