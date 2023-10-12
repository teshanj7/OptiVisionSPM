import React, { useState, useEffect, useRef } from "react";
import './TJPaymentPage.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ViewAll() {
    const [data, setData] = useState([]);

    const divRef = useRef(null);

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = async () => {
        const response = await axios.get("http://localhost:8040/payment");

        if (response.status === 200) {
            setData(response.data);
        }
    }

    function formatCardNumber(cardNo) {
        if (typeof cardNo === 'number') {
            const cardNoStr = cardNo.toString(); // Convert to a string
            if (cardNoStr.length >= 4) {
                const lastFourDigits = cardNoStr.slice(-4);
                const maskedPart = '*'.repeat(cardNoStr.length - 4);
                return maskedPart + lastFourDigits;
            }
        }
        return cardNo;
    }
    
    const saveAsPdf = async (div) => {
        const canvas = await html2canvas(div);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('Payment Report.pdf');
    };

    const handleSave = () => {
        saveAsPdf(divRef.current);
    };
    

    return (
        <div>
             <div className="TJViewPaymentPage" ref={divRef}>
            <br/>
            <h1 className="TJPayViewHeading">MY APPOINTMENT PAYMENTS</h1>
            <br/><br/><br/><br/><br/><br/>
            <table className="TJViewPayTable">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Amount</th>
                        <th style={{ textAlign: "center" }}>Card Number</th>
                        <th style={{ textAlign: "center" }}>Cardholder Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.amount}</td>
                            <td>{formatCardNumber(item.cardNo)}</td>
                            <td>{item.cardholderName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
            <ToastContainer />
        </div>
        <button onClick={handleSave} className="TJPdfButton">Save as PDF</button>
        <br/><br/>

        </div>
       
    )
}

export default ViewAll;
