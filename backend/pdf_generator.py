from fpdf import FPDF


def generate_pdf(transcript_id, transcript, summary):
    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Meeting Summary", ln=True, align="C")

    pdf.set_font("Arial", "", 12)
    pdf.ln(10)
    pdf.cell(0, 10, "Transcript:", ln=True)
    pdf.multi_cell(0, 10, transcript[:500] + "..." if len(transcript) > 500 else transcript)

    pdf.ln(10)
    pdf.cell(0, 10, "Summary:", ln=True)
    pdf.multi_cell(0, 10, summary)

    pdf_path = f"summary_{transcript_id}.pdf"
    pdf.output(pdf_path)
    return pdf_path