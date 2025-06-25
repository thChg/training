import exceljs from "exceljs";
import { saveAs } from "file-saver";
export const exportUserToExcel = async (data) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("User List");

  worksheet.columns = [
    { header: "No.", key: "num", width: 10 },
    { header: "Username", key: "username", width: 30 },
    { header: "Role", key: "role", width: 20 },
    { header: "Apartment", key: "apartment", width: 20 },
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

  data.forEach((user, index) => {
    worksheet.addRow({
      num: index + 1,
      username: user.username,
      role: user.role,
      apartment: user.apartment,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "User List");
};
