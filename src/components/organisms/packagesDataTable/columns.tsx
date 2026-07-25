import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreVertical, Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"
import { toast } from "sonner"

type ColumnActions = {
  onEdit: (pkg: Package) => void
  onDelete: (pkg: Package) => void
  onChangeStatus: (pkg: Package, status: Package["status"]) => void
}

export type Package = {
  id: string
  packageId: string
  trackingNumber: string
  referenceNumber: string

  senderCompany: string

  recipientFirstName: string
  recipientLastName: string
  recipientEmail: string
  recipientPhone: string

  originCity: string
  originProvince: string

  destinationCity: string
  destinationProvince: string

  carrier: "Canada Post" | "UPS" | "FedEx" | "Purolator" | "DHL"

  service: "Standard" | "Express" | "Priority" | "Overnight"

  status:
    | "Pending"
    | "Processing"
    | "Picked Up"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Delayed"
    | "Returned"

  packageType: string
  description: string

  weightKg: number

  lengthCm: number
  widthCm: number
  heightCm: number

  declaredValue: number

  insurance: boolean
  signatureRequired: boolean

  estimatedDelivery: string

  createdAt: string
  updatedAt: string
}

export const columns = (actions: ColumnActions): ColumnDef<Package>[] => [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => (
      <Link
        to={`/packages/${row.original.trackingNumber}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {row.original.trackingNumber}
      </Link>
    ),
  },
  {
    id: "recipient",
    header: "Recipient",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.recipientFirstName} {row.original.recipientLastName}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.original.recipientEmail}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "senderCompany",
    header: "Sender",
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status

      const colors: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-700 border-yellow-300 border p-1",
        Processing: "bg-blue-100 text-blue-700 border-blue-300 border p-1",
        "Picked Up":
          "bg-purple-100 text-purple-700 border-purple-300 border p-1",
        "In Transit": "bg-sky-100 text-sky-700 border-sky-300 border p-1",
        "Out for Delivery":
          "bg-orange-100 text-orange-700 border-orange-300 border p-1",
        Delivered: "bg-green-100 text-green-700 border-green-300 border p-1",
        Delayed: "bg-red-100 text-red-700 border-red-300 border p-1",
        Returned: "bg-gray-100 text-gray-700 border-gray-300 border p-1",
      }

      return <Badge className={colors[status]}>{status}</Badge>
    },
  },
  {
    id: "destination",
    header: "Destination",
    cell: ({ row }) => (
      <>
        {row.original.destinationCity}, {row.original.destinationProvince}
      </>
    ),
  },
  {
    accessorKey: "weightKg",
    header: "Weight",
    cell: ({ row }) => `${row.original.weightKg} kg`,
  },
  {
    accessorKey: "estimatedDelivery",
    header: "ETA",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/packages/${row.original.trackingNumber}`}>
              <DropdownMenuItem>
                <Eye /> View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => actions.onEdit(row.original)}>
              <Pen />
              Edit Package
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-copy"
              onClick={() => {
                navigator.clipboard.writeText(row.original.trackingNumber)

                toast.success("Tracking number copied", {
                  description: row.original.trackingNumber,
                })
              }}
            >
              <Copy />
              Copy Tracking Number
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center text-red-600"
              onClick={() => actions.onDelete(row.original)}
            >
              <Trash2 /> Delete Package
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
