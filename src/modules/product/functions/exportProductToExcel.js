import exceljs from "exceljs";
import { saveAs } from "file-saver";

export const exportProductToExcel = async (data) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Customer List");
  worksheet.columns = [
    { header: "No.", key: "num", width: 5 },
    { header: "Name", key: "name", width: 25 },
    { header: "Category", key: "category", width: 20 },
    { header: "Description", key: "description", width: 50 },
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
  data.forEach((product, index) => {
    worksheet.addRow({
      num: index + 1,
      name: product.name,
      category: product.category,
      description: product.description,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Customer List");
};
