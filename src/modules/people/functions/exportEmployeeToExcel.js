import exceljs from "exceljs";
import { saveAs } from "file-saver";

export const exportEmployeeToExcel = async (data) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Employee List");
  worksheet.columns = [
    { header: "No.", key: "num", width: 5 },
    { header: "Fullname", key: "fullname", width: 25 },
    { header: "Email", key: "email", width: 25 },
    { header: "Contact", key: "phone", width: 20 },
    { header: "Apartment", key: "apartment", width: 25 },
  ];

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = {
      bold: true,
    };
    cell.border = {
      left: { style: "thin" },
      top: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };
  });
  data.forEach((employee, index) => {
    worksheet.addRow({
      num: index + 1,
      fullname: employee.fullname,
      email: employee.email,
      phone: employee.phone,
      apartment: employee.apartment,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Employee List");
};
