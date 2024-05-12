import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { Button } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export function Branch_Download({ data_branch }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set table headers
    const headers = ["Branch ID", "Banch Name", "Branch Location", "District"];

    // Convert data to table format
    const tableData = data_branch.map((branch) => [
      branch.branch_ID,
      branch.branch_name,
      branch.branch_Location,
      branch.district,
    ]);

    // Add Branch Details topic to the center
    doc.setTextColor("#31363F"); // Set topic text color to #31363F
    doc.setFontSize(16);
    doc.text("Branch Details", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    // Add table to PDF with custom options
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30, // Margin from the top
      theme: "grid",
      tableWidth: "auto",
      styles: {
        fontSize: 7.5,
        halign: "center",
        valign: "middle",
        headStyles: {
          fillColor: "#503C3C", // Set table header color to #503C3C
        },
      },
      columnStyles: {},
    });

    // Save PDF
    doc.save("branchs.pdf");
  };

  return (
    <Button className="flex items-center gap-3" onClick={downloadPDF}>
      <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download PDF
    </Button>
  );
}
