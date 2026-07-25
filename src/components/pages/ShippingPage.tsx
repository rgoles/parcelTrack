import { useState } from "react"
import { columns, type Package } from "../organisms/packagesDataTable/columns"
import { DataTable } from "../organisms/packagesDataTable/data-table"
import packages from "@/data/packages.json"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export const ShippingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null)
  const [packageList, setPackageList] = useState(packages)
  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg)
  }

  const handleDelete = (pkg: Package) => {
    setPackageList(packageList.filter((a) => a.id !== pkg.id))
    console.log(pkg)
  }

  const handleChangeStatus = (pkg: Package, status: Package["status"]) => {
    console.log(pkg, status)
  }
  const data = packageList as Package[]
  return (
    <main className="mx-4 my-2 w-full space-y-8">
      <header>
        <div>
          <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Packages
          </h1>
          <p>Manage and track all shipments</p>
        </div>
      </header>
      <DataTable
        columns={columns({
          onEdit: handleEdit,
          onDelete: (pkg) => {
            setPackageToDelete(pkg)
          },
          onChangeStatus: handleChangeStatus,
        })}
        data={data}
      />

      <Dialog
        open={selectedPackage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPackage(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-2">Edit Package</DialogTitle>
            <DialogDescription>
              <FieldSet className="w-full">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input defaultValue={selectedPackage?.recipientFirstName} />

                    <FieldDescription>
                      Choose a unique username for your account.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                    <Input defaultValue={selectedPackage?.recipientLastName} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                    <Input defaultValue={selectedPackage?.recipientEmail} />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                console.log("saved")
              }}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={packageToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPackageToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm package deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete package{" "}
              <span className="font-bold">
                {packageToDelete?.trackingNumber}
              </span>{" "}
              for{" "}
              <span className="font-bold">
                {packageToDelete?.recipientFirstName}{" "}
                {packageToDelete?.recipientLastName}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={"destructive"}
              onClick={() => {
                if (packageToDelete) handleDelete(packageToDelete)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
