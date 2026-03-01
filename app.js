// ================================
// CONFIG
// ================================
const STORAGE_KEY = "milk_records";
const FIXED_RATE = 76;
let currentRecord = null;
// logo loaded via hidden img element in HTML
// logoDataUrl constant no longer needed

// ================================
// INITIAL LOAD
// ================================
document.addEventListener("DOMContentLoaded", () => {

    renderRecords();
    updateSummary();
});

// ================================
// ADD RECORD
// ================================
document.getElementById("recordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const weekDate = document.getElementById("week").value;

    const inputs = document.querySelectorAll(".daily-input");
    const dailyValues = Array.from(inputs).map(i => parseFloat(i.value) || 0);

    const quantity = dailyValues.reduce((a, b) => a + b, 0);
    if (quantity === 0) {
        alert("Please enter milk quantity");
        return;
    }

    const total = quantity * FIXED_RATE;

    const record = {
        id: Date.now(),
        name,
        weekDate,
        dailyValues,
        quantity,
        total
    };

    const records = getRecords();
    records.push(record);
    saveRecords(records);

    renderRecords();
    updateSummary();

    this.reset();
});

// ================================
// STORAGE
// ================================
function getRecords() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ================================
// RENDER RECORDS
// ================================
function renderRecords() {
    const records = getRecords();
    const container = document.getElementById("recordsList");

    container.innerHTML = "";

    if (records.length === 0) {
        container.innerHTML = "<p class='empty-message'>No records yet. Add your first record above.</p>";
        return;
    }

    records.forEach(r => {
        container.innerHTML += `
        <div class="record-card">
            <div class="record-info">
                <div class="record-customer">${r.name}</div>
                <div class="record-details">
                    <div class="record-detail">
                        <span class="record-detail-label">Week Ending</span>
                        <span class="record-detail-value">${r.weekDate}</span>
                    </div>
                    <div class="record-detail">
                        <span class="record-detail-label">Milk Delivered</span>
                        <span class="record-detail-value">${r.quantity} L</span>
                    </div>
                    <div class="record-detail">
                        <span class="record-detail-label">Amount Due</span>
                        <span class="record-detail-value">₹${r.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div class="record-actions">
                <button class="btn btn-primary btn-small" onclick="viewBill(${r.id})">View Bill</button>
                <button class="btn btn-danger btn-small" onclick="deleteRecord(${r.id})">Delete</button>
            </div>
        </div>
        `;
    });
}

// ================================
// SUMMARY
// ================================
function updateSummary() {
    const records = getRecords();

    document.getElementById("totalRecords").textContent = records.length;
    document.getElementById("totalRevenue").textContent =
        records.reduce((sum, r) => sum + r.total, 0);
    document.getElementById("totalMilk").textContent =
        records.reduce((sum, r) => sum + r.quantity, 0);
}

// ================================
// DELETE RECORD
// ================================
function deleteRecord(id) {
    let records = getRecords().filter(r => r.id !== id);
    saveRecords(records);
    renderRecords();
    updateSummary();
}

// ================================
// CLEAR ALL
// ================================
document.getElementById("clearBtn").addEventListener("click", () => {
    if (confirm("Delete all records?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderRecords();
        updateSummary();
    }
});

// ================================
// VIEW BILL (MODAL)
// ================================
function viewBill(id) {
    const record = getRecords().find(r => r.id === id);
    if (!record) return;

    currentRecord = record;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const invoiceNumber = "NRG" + String(record.id).slice(-6);
    const billDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    // calculate dates for each day assuming record.weekDate is the week-ending (Sunday)
    const weekEnd = new Date(record.weekDate);
    const dayDates = days.map((_, i) => {
        // Monday index 0 corresponds to weekEnd - 6 days
        const d = new Date(weekEnd);
        d.setDate(weekEnd.getDate() - (6 - i));
        return d;
    });

    const formatDate = (d) => d.toLocaleDateString('en-GB'); // dd/mm/yyyy

    let tableRows = "";
    days.forEach((d, i) => {
        const dateStr = formatDate(dayDates[i]);
        const amount = record.dailyValues[i] * FIXED_RATE;
        tableRows += `
        <tr>
            <td>${d} (${dateStr})</td>
            <td style="text-align:center">${record.dailyValues[i]}</td>
            <td style="text-align:right">₹${amount.toFixed(2)}</td>
        </tr>`;
    });

    document.getElementById("billContent").innerHTML = `
    <div id="pdfArea">
        <div class="bill-header">
            <div class="bill-title">N.R Guru Milk Supplier</div>
            <div style="color: #666; font-size: 0.9rem;">Chembur, Mumbai</div>
        </div>

        <div class="bill-info">
            <div class="bill-info-item">
                <span class="bill-info-label">Bill No.</span>
                <span class="bill-info-value">${invoiceNumber}</span>
            </div>
            <div class="bill-info-item">
                <span class="bill-info-label">Bill Date</span>
                <span class="bill-info-value">${billDate}</span>
            </div>
            <div class="bill-info-item">
                <span class="bill-info-label">Customer Name</span>
                <span class="bill-info-value">${record.name}</span>
            </div>
            <div class="bill-info-item">
                <span class="bill-info-label">Week Ending</span>
                <span class="bill-info-value">${record.weekDate}</span>
            </div>
        </div>

        <table class="bill-table">
            <thead>
                <tr>
                    <th style="text-align: left;">Day (Date)</th>
                    <th style="text-align: center;">Quantity (L)</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <div class="bill-total">
            <span class="bill-total-label">Total Amount:</span>
            <span>₹${record.total.toFixed(2)}</span>
        </div>

        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.9rem; color: #666;">
            <p style="margin: 0.5rem 0;"><strong>Payment Terms:</strong> Due within 2 days</p>
            <p style="margin-top: 1rem; text-align: center; font-style: italic;">Thank you for your business!</p>
        </div>
    </div>
    `;

    document.getElementById("billModal").classList.add("show");
}

// ================================
// CLOSE MODAL
// ================================
function closeModal() {
    document.getElementById("billModal").classList.remove("show");
}

document.getElementById("downloadBtn").addEventListener("click", function () {
    if (!currentRecord) {
        alert("No record selected");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const record = currentRecord;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const invoiceNumber = "NRG" + record.id;
    const billDate = new Date().toLocaleDateString();

    function finishDoc() {
        // header after logo
        doc.setFontSize(18);
        doc.setFont(undefined, "bold");
        doc.text("R Guruputhiran Milk Supplier", 105, 20, { align: "center" });
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        doc.text("Chembur, Mumbai", 105, 27, { align: "center" });
        doc.setDrawColor(200);
        doc.line(15, 45, 195, 45);

        // bill details
        doc.setFontSize(11);
        doc.text(`Invoice No: ${invoiceNumber}`, 15, 55);
        doc.text(`Bill Date: ${billDate}`, 150, 55);
        doc.text(`Customer: ${record.name}`, 15, 63);
        doc.text(`Week Ending: ${record.weekDate}`, 15, 71);

        // table: include full date with day, remove per-litre rate column
        // calculate dates for each day assuming record.weekDate is week-ending (Sunday)
        const weekEnd = new Date(record.weekDate);
        const dayDates = days.map((_, i) => {
            const d = new Date(weekEnd);
            d.setDate(weekEnd.getDate() - (6 - i));
            return d;
        });
        const formatDate = (d) => d.toLocaleDateString('en-GB');

        const tableData = days.map((day, i) => {
            const dateStr = formatDate(dayDates[i]);
            const liters = record.dailyValues[i];
            const amount = (liters * FIXED_RATE);
            return [ `${day} (${dateStr})`, liters, "Rs " + amount.toFixed(2) ];
        });
        doc.autoTable({
            startY: 80,
            head: [["Day (Date)", "Milk (L)", "Amount"]],
            body: tableData,
            theme: "grid",
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            columnStyles: { 2: { halign: "right" } }
        });
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(13);
        doc.setFont(undefined, "bold");
        doc.text("Total Amount: Rs " + record.total.toFixed(2), 195, finalY, { align: "right" });
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text("Payment due within 7 days.", 15, finalY + 15);
        doc.text("Authorized Signature: ____________________", 120, finalY + 25);
        doc.text("Thank you for your business!", 105, finalY + 40, { align: "center" });
        doc.save("Milk-Invoice.pdf");
    }

    // insert logo from hidden image element if available
    const logoElement = document.getElementById('logoImg');
    if (logoElement && logoElement.src) {
        try {
            doc.addImage(logoElement, "PNG", 15, 10, 30, 30);
        } catch (e) {
            console.warn("embedding logo element failed", e);
        }
    }
    finishDoc();
});