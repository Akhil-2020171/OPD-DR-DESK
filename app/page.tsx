"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Skeleton,
  DatePicker,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Divider,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

import Prescription from "@/components/prescription";

export default function Home(this: any) {
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [departmentId, setDepartmentId] = useState("");

  const [loadingDepartments, setLoadingDepartments] = useState(true);

  const patientColumns = [
    { title: "CrNo", field: "CrNo" },
    { title: "Name", field: "Name" },
  ];

  const [patients, setPatients] = useState<
    { CrNo: string; Name: string; Age: string; Gender: string }[]
  >([]);
  const [patientType, setPatientType] = useState("Waiting");
  const [loadingPatients, setLoadingPatients] = useState(true);

  const [patientDepartment, setPatientDepartment] = useState("");
  const [patientDetails, setPatientDetails] = useState<{
    CrNo: string;
    Name: string;
    Age: string;
    Gender: string;
    Department: string;
  }>();

  const handlePatientDetails = (patient: any) => {
    const patientDetails = {
      CrNo: patient.CrNo,
      Name: patient.Name,
      Age: patient.Age,
      Gender: patient.Gender,
      Department: patientDepartment,
    };

    setPatientDetails(patientDetails);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(patients.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return patients.slice(start, end);
  }, [page, patients]);

  const [windowType, setWindowType] = useState("Prescription");

  const loadWindow = (windowTypeArg: any) => {
    setWindowType(windowTypeArg);
  };

  const handlePatientDepartmentName = (departmentId: any) => {
    departments.forEach((department) => {
      if (department.id.toString() === departmentId) {
        setPatientDepartment(department.name);
      }
    });
  };

  useEffect(() => {
    if (departments.length === 0) {
      setLoadingDepartments(true); // Set loading state before fetching
      fetch("/api/departments")
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data);
          setLoadingDepartments(false); // Set loading state to false after data is fetched
        })
        .catch(() => setLoadingDepartments(false)); // Handle errors gracefully
    }
  }, [departments]);

  const fetchPatients = (patientTypeArg: any) => {
    setPatientType(patientTypeArg);
    if (departmentId === "") {
      return;
    }
    setLoadingPatients(true); // Set loading state before fetching
    fetch(`/api/patientList?departmentId=${departmentId}&status=${patientType}`)
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
        setLoadingPatients(false); // Set loading state to false after data is fetched
      })
      .catch(() => setLoadingPatients(false)); // Handle errors gracefully

    //console.log("fetchPatients", departmentId, patientType);
  };

  const handleDepartmentId = (_component: any) => (event: any) => {
    setDepartmentId(event.target.value);
    handlePatientDepartmentName(event.target.value);
  };

  const handleRowClick = (item: any) => {
    handlePatientDetails(item);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full w-full ">
        <div className="flex flex-col w-1/4 mx-2 rounded-lg overflow-hidden">
          {/* Div1 */}
          <div className="flex flex-col bg-blue-200 h-1/5 rounded-lg p-4">
            <div className="flex justify-between items-center space-x-4">
              <Skeleton
                className="w-full rounded-lg"
                isLoaded={!loadingDepartments}
              >
                <div className="flex flex-col">
                  <Select
                    label="Select a department"
                    onChange={handleDepartmentId(this)}
                  >
                    {departments.map((department) => (
                      <SelectItem key={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </Skeleton>
              <DatePicker className="w-9/20" label="Select Date" />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-2">
              <Input label="Search By CrNo" type="text" />
              <Button className="h-full" color="primary">
                GO
              </Button>
            </div>
          </div>
          {/* Div2 */}
          <div className="bg-green-200 mt-2 h-3/4 rounded-lg">
            {/* Two buttons Waiting and Attended with highlights*/}
            <div className="flex justify-around items-center mt-1">
              <Button
                className="w-2/5"
                color={patientType === "Waiting" ? "primary" : "default"}
                onClick={() => fetchPatients("Waiting")}
              >
                Waiting
              </Button>
              <Button
                className="w-2/5"
                color={patientType === "Attended" ? "primary" : "default"}
                onClick={() => fetchPatients("Attended")}
              >
                Attended
              </Button>
            </div>
            {/* List of patients */}
            <div className="overflow-auto h-4/5 mt-2 mx-2 w-6/7">
              {/* if patients size is greater than 0 */}
              {patients.length > 0 && (
                <Skeleton className="rounded-lg" isLoaded={!loadingPatients}>
                  <Table
                    isStriped
                    aria-label="Patient List"
                    bottomContent={
                      <div className="flex w-full justify-center">
                        <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="secondary"
                          page={page}
                          total={pages}
                          onChange={(page) => setPage(page)}
                        />
                      </div>
                    }
                    classNames={{
                      wrapper: "min-h-[222px]",
                    }}
                  >
                    <TableHeader columns={patientColumns}>
                      {(column) => (
                        <TableColumn key={column.title}>
                          {column.field}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={items}>
                      {(item) => (
                        <TableRow
                          key={item.CrNo}
                          className="cursor-pointer"
                          onClick={() => handleRowClick(item)}
                        >
                          {(columnKey) => (
                            <TableCell>
                              {getKeyValue(item, columnKey)}
                            </TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Skeleton>
              )}
              {/* if patients size is 0 */}
              {patients.length === 0 && (
                <Table aria-label="Patient List">
                  <TableHeader columns={patientColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.title}
                        style={{ textAlign: "center" }}
                      >
                        {column.field}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody emptyContent={"Please Choose a Department."}>
                    {[]}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>

        {/* Div3 */}
        <div className="w-3/4 mx-2 bg-red-200 rounded-lg mb-7">
          <div className="flex w-full flex-wrap md:flex-nowrap justify-around items-center mx-2 mt-2">
            <Button
              color={windowType === "Summary" ? "primary" : "default"}
              onClick={() => loadWindow("Summary")}
            >
              Summary
            </Button>
            <Button
              color={windowType === "Prescription" ? "primary" : "default"}
              onClick={() => loadWindow("Prescription")}
            >
              Prescription
            </Button>
            <Button
              color={windowType === "Past RX" ? "primary" : "default"}
              onClick={() => loadWindow("Past RX")}
            >
              Past RX
            </Button>
            <Button
              color={windowType === "Load EMR" ? "primary" : "default"}
              onClick={() => loadWindow("Load EMR")}
            >
              Load EMR
            </Button>
            <Button
              color={windowType === "Templates" ? "primary" : "default"}
              onClick={() => loadWindow("Templates")}
            >
              Templates
            </Button>
          </div>
          <Divider className="my-2" />

          <div className="flex w-full h-full flex-wrap md:flex-nowrap mx-2 mt-2">
            {windowType === "Prescription" && (
              <Prescription patientData={patientDetails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
