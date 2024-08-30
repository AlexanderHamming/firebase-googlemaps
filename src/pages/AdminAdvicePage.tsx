import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firedb } from "../service/firebase";
import { Restaurant } from "../types/User.types";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";

const AdminAdvicePage: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchFormSuggestions = async (): Promise<Restaurant[]> => {
            const formSuggestions = await getDocs(collection(firedb, "formSuggestions"));
            return formSuggestions.docs.map((doc) => doc.data() as Restaurant);
        };

        const getCollection = async () => {
            const suggestions: Restaurant[] = await fetchFormSuggestions();
            setRestaurants(suggestions);
        };

        getCollection();
    }, []);

    const columns = React.useMemo<ColumnDef<Restaurant>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "address",
                header: "Address",
            },
            {
                accessorKey: "city",
                header: "City",
            },
            {
                accessorKey: "description",
                header: "Description",
            },
            {
                accessorKey: "category",
                header: "Category",
                cell: ({ getValue }) => getValue<string[]>().join(", "),
            },
            {
                accessorKey: "offer",
                header: "Offer",
                cell: ({ getValue }) => getValue<string[]>().join(", "),
            },
            {
                accessorKey: "phone",
                header: "Phone",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "website",
                header: "Website",
            },
            {
                accessorKey: "facebook",
                header: "Facebook",
            },
            {
                accessorKey: "instagram",
                header: "Instagram",
            },
            //For buttons
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(row.original)}>Edit</button>
                        <button onClick={() => handleDelete(row.original)}>Delete</button>
                        <button onClick={() => handleAddToDb(row.original)}>Add to DB</button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: restaurants,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    const handleEdit = (restaurant: Restaurant) => {
        console.log("Edit", restaurant);
    };

    const handleDelete = (restaurant: Restaurant) => {
        console.log("Delete", restaurant);
    };

    const handleAddToDb = (restaurant: Restaurant) => {
        console.log("Add to DB", restaurant);
    };

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                            <td key={cell.id} style={{ border: "1px solid black", padding: "8px" }}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminAdvicePage;
