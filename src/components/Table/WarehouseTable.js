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
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';
import ShelfLocationModal from '../Modal/ShelfLocationModal';
import {
  deleteWarehouse,
  fetchWarehouses,
  fetchWarehousesWithFilters,
} from '@/actions/actions';
import EditWarehouseModal from '../Modal/EditWarehouseModal';

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
  //const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (isSearchClicked) {
      const filteredFormValue = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      if (Object.entries(filteredFormValue).length > 0) {
        fetchWarehousesWithFilters(filteredFormValue, {
          pageNum: page,
          pageSize,
        }).then((res) => {
          setRows(res.list);
          setTotal(res.total);
        });
      }
    } else {
      fetchWarehouses({ pageNum: page, pageSize }).then((res) => {
        setRows(res.list);
        setTotal(res.total);
      });
    }
  }, [page, pageSize, refresh, isSearchClicked]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };

  const handleDeleteRow = async (id) => {
    deleteWarehouse(id).then((res) => setRefresh({}));
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
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head>
            {headers.map((header, index) => (
              <StructuredListCell head key={header.key}>
                {header.header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
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
                        All Shelves
                      </Link>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell key={header.key}>
                    {row[header.key]}
                  </StructuredListCell>
                );
              })}
              <StructuredListCell>
                <IconButton size="xs" kind="ghost" className="mr-[0.5rem]">
                  <Edit size={15} onClick={() => handleEditRow(row)} />
                </IconButton>
                <IconButton
                  size="xs"
                  kind="ghost"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <Delete size={15} />
                </IconButton>
              </StructuredListCell>
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
