import { useParams } from "react-router"
import packages from "@/data/packages.json"
export const PackageDetailsPage = () => {
  const { trackingNumber } = useParams()
  const pkg = packages.find((p) => p.trackingNumber === trackingNumber)
  return (
    <>
      <div>Package tracking number: {trackingNumber}</div>

      <div>Package ID: {pkg?.id}</div>
      <p>Recipient: {pkg?.recipientFirstName}</p>
      <p>Recipient: {pkg?.recipientLastName}</p>
      <p>Sender: {pkg?.senderCompany}</p>
      <p>Status: {pkg?.status}</p>
      <p>Carrier: {pkg?.carrier}</p>
      <p>Destination: {pkg?.destinationCity}</p>
    </>
  )
}
