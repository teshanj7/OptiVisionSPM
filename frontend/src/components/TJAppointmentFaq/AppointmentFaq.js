import React, {useState} from "react";
import "../TJAppointmentFaq/AppointmentFaq.css";
const { speechSynthesis } = window;

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
  
    speechSynthesis.speak(utterance);
  };

export default function FAQ() {

    const [faqs, setfaqs] = useState([
        {
            question: 'How to create an appointment at OptiVision?',
            answer: 'You can create an appointment by visiting the appointment dashboard and clicking the view all opticians button.'
        },
        {
            question: 'How can I select my preferred optician for an appointment?',
            answer: 'You can click the view all opticians button and it showcase all the opticians here at OptiVision.'
        },
        {
            question: 'What kind of tests can I do?',
            answer: 'You can test and detect Glaucoma, Cataract, Color Blindness and Visual Acuity.'
        },
        {
            question: 'Do I need to do a payment to schedule an appointment?',
            answer: 'Yes, you will have to pay an amount of 2500 LKR per appointment.'
        },
        {
            question: 'Are the opticians well qualified?',
            answer: 'Yes, the opticians at OptiVision are well qualified doctors and they are rated by the users itself. You can check the doctor ratings in the appointment page.'
        },
        {
            question: 'Will there be refunds if I miss an appointment?',
            answer: 'No, we do not offer refunds, however you can contact our administration for a solution regarding this issue.'
        }
    ]); 

    return (

        <div className="FaqPage">
            <h1 className="FAQHeading">FREQUENTLY ASKED QUESTIONS (FAQ's)</h1>

            {faqs.map((faq, index) => (
                <div key={index} className="FaqDiv">
                    <br/>
                    <h3 className="FaqQuestion" onClick={() => speak(faq.question)}>{faq.question}</h3>
                    <p className="FaqAnswer">---{faq.answer}</p>
                    <button className="FaqButton" onClick={() => speak(faq.answer)}>Read Aloud</button>
                </div>
                
            ))}
            <br/><br/>

        </div>
    )
}