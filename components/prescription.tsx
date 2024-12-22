"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

export default function Prescription(Data: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { patientData } = Data;

  if (!patientData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="bg-white border border-gray-200 rounded-md shadow-md"
          style={{
            textAlign: "center",
            display: "inline-block", // Ensure dynamic sizing
            padding: "0.5rem",
          }}
        >
          No patient selected
        </div>
      </div>
    );
  }

  const patientName = patientData?.Name;
  const patientAge = patientData?.Age;
  const patientCrNo = patientData?.CrNo;
  const patientGender = patientData?.Gender;
  const Department = patientData?.Department;

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Row 1 */}
      <div className="flex w-full" style={{ margin: 0, padding: "3px" }}>
        <Skeleton className="w-1/4 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              {Department}
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                {patientCrNo}
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <div>{patientName}</div>
                <Divider
                  className="my-divider"
                  orientation="vertical"
                  style={{
                    borderColor: "#000000",
                    height: "20px",
                  }}
                />
                <div>
                  {patientAge} Yr - {patientGender}
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center p-4">
              <div className="flex w-full flex-wrap md:flex-nowrap justify-around">
                <Button color="primary" onPress={onOpen}>
                  Vitals/GE
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Skeleton>
        <div className="mx-2" />
        <Skeleton className="w-1/3 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Chief Complaints
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
        <div className="mx-2" />
        <Skeleton className="w-1/3 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Diagnosis
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
      </div>

      {/* Row 2 */}
      <div className="flex w-full" style={{ margin: 0, padding: "3px" }}>
        <Skeleton className="w-3/4 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Treatment/Drug Advices
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
        <div className="mx-2" />
        <Skeleton className="w-1/5 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Follow-UP
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
      </div>

      {/* Row 3 */}
      <div className="flex w-full" style={{ margin: 0, padding: "3px" }}>
        <Skeleton className="w-2/5 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Investigation
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
        <div className="mx-2" />
        <Skeleton className="w-2/5 rounded-lg" isLoaded={true}>
          <Card className="bg-yellow-100">
            <CardHeader className="justify-center">
              <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                Procedure
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center space-x-4">
                <Textarea
                  isRequired
                  className="w-full"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                />
              </div>
            </CardBody>
          </Card>
        </Skeleton>
        <div className="flex flex-col w-1/6 p-3">
          <Button color="primary">Bookmark</Button>
          <div className="p-2" />
          <Button color="primary">Preview</Button>
          <div className="p-2" />
          <Button color="primary">Save RX</Button>
        </div>
      </div>

      {/* Modal for Vitals/GE */}
      <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Vitals/GE
                <div className="justify-around mx-2 p-1 bg-blue-200 rounded-md shadow-md">
                  {patientCrNo}/{patientName}/{patientAge} Yr/{patientGender}/
                  {Department}
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
