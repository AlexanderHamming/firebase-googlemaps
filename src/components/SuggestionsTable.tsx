import React, { useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import EditableInput from "../components/EditableInput";
import { RestaurantWithId } from "../types/User.types";
import "../assets/SuggestionsTable.scss";

interface SuggestionsTableProps {
    restaurants: RestaurantWithId[];
    editMode: string | null;
    editData: Partial<RestaurantWithId> | null;
    onEditClick: (restaurant: RestaurantWithId) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSaveClick: () => Promise<void>;
    onDelete: (restaurant: RestaurantWithId) => Promise<void>;
    onAddToDb: (restaurant: RestaurantWithId) => Promise<void>;
}

const SuggestionsTable: React.FC<SuggestionsTableProps> = ({
    restaurants,
    editMode,
    editData,
    onEditClick,
    onInputChange,
    onSaveClick,
    onDelete,
    onAddToDb,
}) => {
    const columns = useMemo<ColumnDef<RestaurantWithId>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) =>
                    editMode === row.original.id ? (
                        <EditableInput
                            name="name"
                            value={editData?.name || ""}
                            onChange={onInputChange}
                        />
                    ) : (
                        row.original.name
                    ),
            },
            {
                accessorKey: "address",
                header: "Address",
                cell: ({ row }) =>
                    editMode === row.original.id ? (
                        <EditableInput
                            name="address"
                            value={editData?.address || ""}
                            onChange={onInputChange}
                        />
                    ) : (
                        row.original.address
                    ),
            },
            {
                accessorKey: "city",
                header: "City",
                cell: ({ row }) =>
                    editMode === row.original.id ? (
                        <EditableInput
                            name="city"
                            value={editData?.city || ""}
                            onChange={onInputChange}
                        />
                    ) : (
                        row.original.city
                    ),
            },
            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) =>
                    editMode === row.original.id ? (
                        <EditableInput
                            name="description"
                            value={editData?.description || ""}
                            onChange={onInputChange}
                        />
                    ) : (
                        row.original.description
                    ),
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
                                <button onClick={() => onDelete(row.original)}>Del</button>
                                <button onClick={() => onAddToDb(row.original)}>Add</button>
                            </>
                        )}
                    </div>
                ),
            },
        ],
        [editMode, editData]
    );

    const table = useReactTable({
        data: restaurants,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }} id="table">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} style={{ border: "1px solid black", padding: "8px" }}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
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
                                style={{ border: "1px solid black", padding: "8px" }}
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

export default SuggestionsTable;
