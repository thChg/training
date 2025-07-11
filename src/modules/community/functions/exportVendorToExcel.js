import exceljs from "exceljs";
import { saveAs } from "file-saver";

export const exportVendorToExcel = async (data) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Vendor List");
  worksheet.columns = [
    { header: "No.", key: "num", width: 5 },
    { header: "Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 25 },
    { header: "Address", key: "address", width: 25 },
    { header: "Contact", key: "phone", width: 20 },
    { header: "Tax ID", key: "taxId", width: 25 },
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
  data.forEach((vendor, index) => {
    worksheet.addRow({
      num: index + 1,
      name: vendor.name,
      email: vendor.email,
      address: vendor.address,
      phone: vendor.phone,
      taxId: vendor.taxId,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Vendor List");
};