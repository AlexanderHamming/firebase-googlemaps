import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import EditableInput from '../components/EditableInput';
import { RestaurantWithId } from '../types/User.types';

interface ApprovedRestaurantsTableProps {
  restaurants: RestaurantWithId[];
  editMode: string | null;
  editData: Partial<RestaurantWithId> | null;
  onEditClick: (restaurant: RestaurantWithId) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveClick: () => Promise<void>;
  onDelete: (restaurant: RestaurantWithId) => Promise<void>;
}

const ApprovedRestaurantsTable: React.FC<ApprovedRestaurantsTableProps> = ({
  restaurants,
  editMode,
  editData,
  onEditClick,
  onInputChange,
  onSaveClick,
  onDelete,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<RestaurantWithId>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="name"
            value={editData?.name || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.name
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="address"
            value={editData?.address || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.address
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'city',
      header: 'City',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="city"
            value={editData?.city || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.city
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="category"
            value={editData?.category?.join(', ') || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.category?.join(', ') || ''
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'offer',
      header: 'Offer',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="offer"
            value={editData?.offer?.join(', ') || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.offer?.join(', ') || ''
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const isEditing = editMode === row.original.id;
        return isEditing ? (
          <EditableInput
            name="description"
            value={editData?.description || ''}
            onChange={onInputChange}
          />
        ) : (
          row.original.description || ''
        );
      },
      enableSorting: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '8px' }} className="actions-container">
          {editMode === row.original.id ? (
            <button onClick={onSaveClick}>Save</button>
          ) : (
            <>
              <button onClick={() => onEditClick(row.original)}>Edit</button>
              <button onClick={() => onDelete(row.original)}>Delete</button>
            </>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: restaurants,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table
      style={{ width: '100%', borderCollapse: 'collapse' }}
      id="approved-restaurants-table"
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ border: '1px solid black', padding: '8px' }}
                data-label={cell.column.columnDef.header}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApprovedRestaurantsTable;
