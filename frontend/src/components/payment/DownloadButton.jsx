import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { Button } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export function DownloadButton({ data }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set table headers
    const headers = [
      "Payment ID",
      "Amount (Rs.)",
      "Payment Method",
      "Payment Status",
      "City",
      "District",
      "Paid Time",
      "Email",
      "Update Status",
    ];

    // Convert data to table format
    const tableData = data.map((payment) => [
      payment.payment_id,
      payment.payment_amount,
      payment.payment_method,
      payment.payment_status,
      payment.nearest_town,
      payment.district,
      new Date(payment.paid_time).toLocaleString(),
      payment.email,
      payment.updated_time,
    ]);

    // Add Transaction Report topic to the center
    doc.setTextColor("#31363F"); // Set topic text color to #31363F
    doc.setFontSize(16);
    doc.text("Transaction Report", doc.internal.pageSize.getWidth() / 2, 15, {
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
    doc.save("payments.pdf");
  };

  return (
    <Button className="flex items-center gap-3" onClick={downloadPDF} size="sm">
      <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download PDF
    </Button>
  );
}
