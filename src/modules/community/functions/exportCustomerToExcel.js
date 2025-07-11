import exceljs from "exceljs";
import { saveAs } from "file-saver";

export const exportCustomerToExcel = async (data) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Customer List");
  worksheet.columns = [
    { header: "No.", key: "num", width: 5 },
    { header: "Full name", key: "fullname", width: 25 },
    { header: "Email", key: "email", width: 25 },
    { header: "Company", key: "company", width: 20 },
    { header: "Contact", key: "phone", width: 20 },
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
  data.forEach((customer, index) => {
    worksheet.addRow({
      num: index + 1,
      fullname: customer.fullname,
      email: customer.email,
      company: customer.company,
      phone: customer.phone,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Customer List");
};